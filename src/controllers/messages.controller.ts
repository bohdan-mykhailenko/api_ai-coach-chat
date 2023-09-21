import { Controller, Get } from '@nestjs/common';
import { MessagesService } from '../services/messages.service';
import { Message } from 'src/models/message.model';

@Controller()
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Get('/messages')
  async findAllMessages(): Promise<Message[]> {
    const messages = await this.messagesService.getAllMessages();

    return messages;
  }
}
