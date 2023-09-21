import { SequelizeModuleOptions } from '@nestjs/sequelize';

const db = {
  DB_HOST: 'ep-sweet-heart-65946773.eu-central-1.aws.neon.tech',
  DB_NAME: 'ai_coach',
  DB_USERNAME: 'bohdan-mykhailenko',
  DB_PASSWORD: 'S2uwPg6nbIRm',
};

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
