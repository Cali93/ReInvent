import Sequelize from 'sequelize';
import { db } from '../../ressources/db';

const models = {
  User: db.import('./User'),
  Office: db.import('./Office'),
  Estate: db.import('./Estate')
};

Object.keys(models).forEach(modelName => {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
});

models.db = db;
models.Sequelize = Sequelize;

export default models;
