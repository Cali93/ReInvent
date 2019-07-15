'use strict';
require('dotenv-safe').config();

module.exports = {
  development: {
    database: process.env.DEV_DB_NAME,
    username: process.env.DEV_DB_USERNAME,
    password: process.env.DEV_DB_PASSWORD,
    host: process.env.DEV_DB_HOST,
    port: process.env.DEV_DB_PORT,
    dialect: 'postgres'
  },
  test: {
    database: process.env.TEST_DB_NAME,
    username: process.env.TEST_DB_USERNAME,
    password: process.env.TEST_DB_PASSWORD,
    host: process.env.TEST_DB_HOST,
    port: process.env.TEST_DB_PORT,
    dialect: 'postgres',
    operatorsAliases: false
  },
  production: {
    database: process.env.PROD_DB_NAME,
    username: process.env.PROD_DB_USERNAME,
    password: process.env.PROD_DB_PASSWORD,
    host: process.env.PROD_DB_HOST,
    port: process.env.PROD_DB_PORT,
    dialect: 'postgres',
    operatorsAliases: false
  }
};
