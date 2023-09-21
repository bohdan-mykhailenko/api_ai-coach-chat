import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Message } from '../models/message.model';
import { CreateMessageDto } from 'src/dto/create-message.dto';

@Injectable()
export class MessagesService {
  constructor(
    @InjectModel(Message)
    private readonly messageModel: typeof Message,
  ) {}

  async getAllMessages(): Promise<Message[]> {
    try {
      const messages = await Message.findAll();

      return messages;
    } catch (error) {
      throw new Error(`Error while fetching messages: ${error}`);
    }
  }

  async createMessage(messageDto: CreateMessageDto) {
    try {
      const message = await this.messageModel.create({
        role: messageDto.role,
        content: messageDto.content,
      });

      return message;
    } catch (error) {
      console.log(error);
      throw new Error(`Error while creating message: ${error}`);
    }
  }
}
