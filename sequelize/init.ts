import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    logging: false,
    dialect: 'postgres',
    pool: {
      max: 50,
      min: 0,
      acquire: 5000,
      idle: 60000
    },
    dialectOptions: {
      application_name: 'backend-caldera-news'
    }
  }
);
