import Sequelize from 'sequelize';
import * as dotenv from 'dotenv-safe';
dotenv.config();

const dbByEnv = () => {
  switch (process.env.NODE_ENV) {
    case 'development':
      return new Sequelize(
        process.env.DEV_DATABASE_URL,
        {
          dialect: 'postgres',
          port: 5432,
          define: { underscored: true, plain: true }
        }
      );

    case 'test':
      return new Sequelize(
        process.env.TEST_DATABASE_URL,
        {
          dialect: 'postgres',
          port: 5432,
          define: { underscored: true, plain: true }
        }
      );

    case 'production':
      return new Sequelize(
        process.env.DATABASE_URL,
        {
          dialect: 'postgres',
          dialectOptions: {
            ssl: true
          },
          host: process.env.POSTGRES_HOST,
          define: { underscored: true },
          ssl: true
        }
      );

    default:
      return new Sequelize(
        'database', 'username', 'password',
        {
          dialect: 'postgres',
          host: 'localhost',
          define: { underscored: true, plain: true }
        }
      );
  }
};

export const db = dbByEnv();
