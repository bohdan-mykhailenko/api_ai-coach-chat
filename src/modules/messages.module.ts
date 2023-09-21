// src/messages/messages.module.ts

import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Message } from '../models/message.model';
import { MessagesController } from 'src/controllers/messages.controller';
import { MessagesService } from 'src/services/messages.service';

@Module({
  imports: [SequelizeModule.forFeature([Message])],
  controllers: [MessagesController],
  providers: [MessagesService],
})
export class MessagesModule {}
