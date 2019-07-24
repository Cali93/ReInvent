'use strict';
require('dotenv-safe').config();
const defer = require('config/defer').deferConfig;
module.exports = {
  API_CONFIG: {
    api: {
      port: process.env.PORT,
      projectOwnerEmail: process.env.PROJECT_OWNER_EMAIL,
      competitorsDomain: 'competitor.com',
      corsOptions: {
        credentials: true,
        origin: defer(function () {
          return this.API_CONFIG.app.url;
        })
      }
    },
    app: {
      url: process.env.REACT_APP_URL
    },
    dbConfig: {
      url: process.env.DB_URL,
      name: process.env.DB_NAME,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      options: {
        dialect: 'postgres',
        define: { underscored: true, plain: true },
        port: process.env.DB_PORT,
        host: process.env.DB_HOST
      }
    },
    redisConfig: {
      url: 'localhost:6379'
    },
    sessionOptions: {
      name: 'local_session_id',
      secret: process.env.COOKIE_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        maxAge: 144 * 60 * 60 * 1000 // 6 days
      }
    },
    oauth: {
      google: {
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET
      }
    }
  }
};
