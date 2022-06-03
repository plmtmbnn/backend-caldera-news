import { Sequelize } from 'sequelize';
import CryptoJS from 'crypto-js';

export const sequelize = new Sequelize(
  process.env.DB_NAME,
  CryptoJS.AES.decrypt(process.env.DB_USER.toString(), 's3cREt_k3Y').toString(CryptoJS.enc.Utf8),
  CryptoJS.AES.decrypt(process.env.DB_PASS.toString(), 's3cREt_k3Y').toString(CryptoJS.enc.Utf8),
  {
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    pool: {
      max: 30,
      min: 0,
      acquire: 60000,
      idle: 10000
    },
    logging: false,
    dialect: 'postgres',
    dialectOptions: {
      application_name: 'backend-caldera-news'
    }
  }
);
