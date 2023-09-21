import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OpenAiService } from './openAi/openAi.service';
import { OpenAiController } from './openAi/openAi.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Message } from './models/message.model';
import { db } from './database/db.config';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: db.DB_HOST || process.env.DB_HOST,
      username: db.DB_USERNAME || process.env.DB_USERNAME,
      password: db.DB_PASSWORD || process.env.DB_PASSWORD,
      database: db.DB_NAME || process.env.DB_NAME,
      models: [Message],
      dialectOptions: {
        ssl: true,
      },
    }),
    SequelizeModule.forFeature([Message]),
  ],
  controllers: [AppController, OpenAiController],
  providers: [AppService, OpenAiService],
})
export class AppModule {}
