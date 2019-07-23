require('dotenv-safe').config();

module.exports = {
  API_CONFIG: {
    dbConfig: {
      options: {
        dialectOptions: {
          ssl: true
        },
        ssl: true,
        operatorsAliases: false
      }
    },
    redisConfig: {
      url: process.env.REDIS_URL
    },
    sessionOptions: {
      name: 'session_id',
      cookie: {
        secure: true
      }
    }
  }
};
