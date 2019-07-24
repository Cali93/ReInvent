import dotenv from 'dotenv-safe';
import {
  ApolloServer,
  makeExecutableSchema,
  ApolloError
} from 'apollo-server-express';
import { fileLoader, mergeTypes, mergeResolvers } from 'merge-graphql-schemas';
import { GraphQLError } from 'graphql';
import { applyMiddleware } from 'graphql-middleware';
import cors from 'cors';
import express from 'express';
import session from 'express-session';
import connectRedis from 'connect-redis';
import passport from 'passport';
import helmet from 'helmet';
import { v4 } from 'uuid';
import path from 'path';
import { API_CONFIG } from 'config';
import { redis } from './ressources/redis';
import models from './ressources/models';
import { initGoogleStrategy } from './middlewares/passport/googleStrategy';
import { permissions } from './middlewares/guards/permissions';
dotenv.config();

const main = async () => {
  const app = express();
  const port = API_CONFIG.api.port;
  const RedisStore = connectRedis(session);

  app.use(helmet());
  app.use(cors(API_CONFIG.api.corsOptions));

  app.use(
    session({
      store: new RedisStore({
        client: redis
      }),
      ...API_CONFIG.sessionOptions
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
    passport.authenticate('google', {
      session: false,
      failureRedirect: 'http://localhost:3000/authenticate'
    }),
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

  const typeDefs = mergeTypes(
    fileLoader(path.join(__dirname, '/entities/**/*.schema.js')),
    { all: true }
  );
  const resolvers = mergeResolvers(
    fileLoader(path.join(__dirname, '/entities/**/*.resolver.js')),
    { all: true }
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
      console.log({ errId, error: JSON.stringify(error) });

      return new GraphQLError(`Internal Error: ${errId}`);
    }
  });

  server.applyMiddleware({ app, cors: false });

  // Throw an error if requesting for an unexisting route
  app.use((_req, _res, next) => {
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

  await models.db.sync();

  app.listen({ port }, () => {
    console.log(`🚀 Server ready on: http://localhost:${port}/graphql 🚀`);
  });
};

main().catch(err => console.error(err));
