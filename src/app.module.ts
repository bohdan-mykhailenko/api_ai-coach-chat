import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { databaseConfig } from './modules/database.module';
import { MessagesModule } from './modules/messages.module';

@Module({
  imports: [SequelizeModule.forRoot(databaseConfig), MessagesModule],
})
export class AppModule {}
