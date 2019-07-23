require('dotenv-safe').config();

module.exports = {
  API_CONFIG: {
    sessionOptions: {
      name: 'test_session_id'
    },
    dbConfig: {
      operatorsAliases: false
    }
  }
};
