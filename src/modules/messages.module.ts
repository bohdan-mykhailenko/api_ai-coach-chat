import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Message } from '../models/message.model';
import { MessagesController } from 'src/controllers/messages.controller';
import { MessagesService } from 'src/services/messages.service';
import { SocketGateway } from 'src/socket/socket.gateway';

@Module({
  imports: [SequelizeModule.forFeature([Message])],
  controllers: [MessagesController],
  providers: [MessagesService, SocketGateway],
})
export class MessagesModule {}
