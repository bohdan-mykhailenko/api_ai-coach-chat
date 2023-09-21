import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { MessagesModule } from './messages.module';
import { databaseConfig } from 'src/config/database.config';

@Module({
  imports: [SequelizeModule.forRoot(databaseConfig), MessagesModule],
})
export class AppModule {}
