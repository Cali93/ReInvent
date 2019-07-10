import Sequelize from 'sequelize';
import * as dotenv from 'dotenv-safe';
dotenv.config();
// development
export const db = new Sequelize(
  process.env.DEV_DATABASE_URL || 'localhost',
  {
    dialect: 'postgres',
    host: 5432,
    define: { underscored: true, plain: true }
  }
);

// production (comment if in development) $fixMe
// export const db = new Sequelize(
//   process.env.DATABASE_URL,
//   {
//     dialect: 'postgres',
//     dialectOptions: {
//       ssl: true
//     },
//     host: process.env.POSTGRES_HOST,
//     define: { underscored: true },
//     ssl: true
//   }
// );
