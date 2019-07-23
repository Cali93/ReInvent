import dotenv from 'dotenv-safe';
import {
  ApolloServer,
  makeExecutableSchema,
  ApolloError
} from 'apollo-server-express';
import { fileLoader, mergeTypes, mergeResolvers } from 'merge-graphql-schemas';
import { GraphQLError } from 'graphql';
import { applyMiddleware } from 'graphql-middleware';
import express from 'express';
import session from 'express-session';
import connectRedis from 'connect-redis';
import passport from 'passport';
import helmet from 'helmet';
import { v4 } from 'uuid';
import path from 'path';
import { redis } from './utils/redis';
import { corsWhiteList } from './utils/corsOrigins';
import models from './models/sequelize';
import { initGoogleStrategy } from './middlewares/passport/googleStrategy';
import { permissions } from './middlewares/guards/permissions';
dotenv.config();

const main = async () => {
  const app = express();
  app.use(helmet());

  const port = process.env.PORT;
  const corsOptions = {
    credentials: true,
    origin: corsWhiteList
  };

  const typeDefs = mergeTypes(fileLoader(path.join(__dirname, './schema')));
  const resolvers = mergeResolvers(
    fileLoader(path.join(__dirname, './resolvers'))
  );

  const RedisStore = connectRedis(session);

  app.use(
    session({
      store: new RedisStore({
        client: redis
      }),
      name: 'session_id',
      secret: process.env.COOKIE_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        // secure: process.env.NODE_ENV === 'production',
        maxAge: 144 * 60 * 60 * 1000 // 6 days
      }
    })
  );

  await initGoogleStrategy(passport);
  app.use(passport.initialize());

  // GET /auth/google
  //   Use passport.authenticate() as route middleware to authenticate the
  //   request.  The first step in Google authentication will involve
  //   redirecting the user to google.com.  After authorization, Google
  //   will redirect the user back to this application at /oauth/google
  app.get(
    '/auth/google',
    passport.authenticate('google', {
      session: false,
      scope: [
        'https://www.googleapis.com/auth/plus.login',
        'https://www.googleapis.com/auth/userinfo.email'
      ]
    })
  );

  app.get(
    '/oauth/google',
    passport.authenticate('google', { session: false, failureRedirect: 'http://localhost:3000/authenticate' }),
    (req, res, next) => {
      if (req.user.userDetails.id && req.session) {
        req.session.userId = req.user.userDetails.id;
        req.session.accessToken = req.user.userDetails.accessToken;
        req.session.refreshToken = req.user.userDetails.refreshToken;
        res.redirect('http://localhost:3000/app/estates/');
      } else {
        next();
      }
    }
  );

  const schema = applyMiddleware(
    makeExecutableSchema({
      typeDefs,
      resolvers
    }),
    permissions
  );

  const server = new ApolloServer({
    schema,
    context: ({ req, res }) => {
      return {
        req,
        res,
        models
      };
    },
    formatError: error => {
      if (error.originalError instanceof ApolloError) {
        return error;
      }

      const errId = v4();
      console.log({ errId, error });

      return new GraphQLError(`Internal Error: ${errId}`);
    }
  });

  server.applyMiddleware({ app, cors: corsOptions });
  // Makes sure the tables exists
  await models.db.sync();

  app.listen({ port }, () => {
    console.log(`🚀 Server ready on port: ${port} 🚀`);
  });
};

main().catch(err => console.error(err));
