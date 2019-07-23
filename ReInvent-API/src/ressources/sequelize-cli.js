'use strict';
const { API_CONFIG } = 'config';
const { name, username, password, options } = API_CONFIG.dbConfig;

const db = {
  name, username, password, ...options
};

module.exports = {
  development: {
    ...db
  },
  test: {
    ...db
  },
  production: {
    ...db
  }
};
