import { Sequelize } from 'sequelize-typescript';
import { db } from './db.config';
import { Message } from '../models/message.model';

export const initDB = () => {
  const DB_USERNAME = db.DB_USERNAME || process.env.DB_USERNAME;
  const DB_PASSWORD = db.DB_PASSWORD || process.env.DB_PASSWORD;
  const DB_HOST = db.DB_HOST || process.env.DB_HOST;
  const DB_NAME = db.DB_NAME || process.env.DB_NAME;

  const URI = `postgres://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`;

  if (!URI) {
    throw new Error('DB_URI is wrong!');
  }

  const sequelize = new Sequelize(URI, {
    dialect: 'postgres',
    dialectOptions: {
      ssl: true,
    },
    models: [Message],
  });

  sequelize
    .authenticate()
    .then(() => {
      console.log('Database connection has been established successfully.');
    })
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    });

  return sequelize;
};
