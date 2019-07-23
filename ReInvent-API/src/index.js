import dotenv from 'dotenv-safe';
import {
  ApolloServer,
  makeExecutableSchema,
  ApolloError
} from 'apollo-server-express';
import cors from 'cors';
import { fileLoader, mergeTypes, mergeResolvers } from 'merge-graphql-schemas';
import { GraphQLError } from 'graphql';
import express from 'express';
import session from 'express-session';
import connectRedis from 'connect-redis';
import { applyMiddleware } from 'graphql-middleware';
import passport from 'passport';
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
  const port = process.env.PORT;
  const corsOptions = {
    credentials: true,
    origin: corsWhiteList
  };
  const RedisStore = connectRedis(session);

  app.use(cors(corsOptions));

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

  // @GET /auth/google
  // Use passport.authenticate() as route middleware to authenticate the
  // request.  The first step in Google authentication will involve
  // redirecting the user to google.com.  After authorization, Google
  // will redirect the user back to this application at /oauth/google
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

  const typeDefs = mergeTypes(fileLoader(path.join(__dirname, './schema')));
  const resolvers = mergeResolvers(
    fileLoader(path.join(__dirname, './resolvers'))
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

  server.applyMiddleware({ app, cors: false });

  // Throw an error if requesting for an unexisting route
  app.use((req, _res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
  });

  // Handle errors
  app.use((error, _req, res, next) => {
    res.status(error.status || 500).json({
      error: {
        message: error.message
      }
    });
  });

  // Makes sure the tables exists
  await models.db.sync();

  app.listen({ port }, () => {
    console.log(`🚀 Server ready on port: ${port} 🚀`);
  });
};

main().catch(console.error);
