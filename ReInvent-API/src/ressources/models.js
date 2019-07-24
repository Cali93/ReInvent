import Sequelize from 'sequelize';
import { db } from './db';
const { Op } = Sequelize;

const models = {
  User: db.import('../entities/User/User.model.js'),
  Office: db.import('../entities/Office/Office.model.js'),
  Estate: db.import('../entities/Estate/Estate.model.js')
};

Object.keys(models).forEach(modelName => {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
});

// models.db = db;
// models.Op = Op;
// models.Sequelize = Sequelize;

export default {
  ...models,
  db,
  Op,
  Sequelize
};
