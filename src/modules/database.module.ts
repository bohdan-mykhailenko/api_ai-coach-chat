import { SequelizeModuleOptions } from '@nestjs/sequelize';
import { db } from '../config/db.config';

export const databaseConfig: SequelizeModuleOptions = {
  dialect: 'postgres',
  host: db.DB_HOST || process.env.DB_HOST,
  username: db.DB_USERNAME || process.env.DB_USERNAME,
  password: db.DB_PASSWORD || process.env.DB_PASSWORD,
  database: db.DB_NAME || process.env.DB_NAME,
  dialectOptions: {
    ssl: true,
  },
  autoLoadModels: true,
  synchronize: false,
};
