import Sequelize from 'sequelize';
import { API_CONFIG } from 'config';

const { url, name, username, password, options } = API_CONFIG.dbConfig;

export const db = new Sequelize(
  url || (name, username, password),
  {
    ...options
  }
);
