import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { Injectable } from '@nestjs/common';
import OpenAI from 'openai'; // Import the OpenAI library
import { API_KEY } from 'src/config/api-key.config';
import { MessagesService } from 'src/services/messages.service';
import { CreateMessageDto } from 'src/dto/create-message.dto';

@WebSocketGateway({
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
})
@Injectable()
export class SocketGateway {
  @WebSocketServer()
  server: Server;

  private readonly openai: OpenAI = new OpenAI({ apiKey: API_KEY });

  constructor(private readonly messagesService: MessagesService) {}

  @SubscribeMessage('messageToOpenAI')
  async handleMessage(client: any, payload: CreateMessageDto): Promise<void> {
    try {
      const response = await this.openai.chat.completions.create({
        messages: [
          {
            role: 'system',
            content: 'You are a helpful Agile Coach.',
          },
          {
            role: 'user',
            content: payload.content,
          },
          {
            role: 'assistant',
            content:
              'As a project manager, I want to assign tasks to team members so that I can track progress.',
          },
        ],
        max_tokens: 10,
        model: 'gpt-3.5-turbo',
      });

      await this.messagesService.createMessage({
        role: 'user',
        content: payload.content,
      });

      const assistantMessage = await this.messagesService.createMessage({
        role: 'assistant',
        content:
          response.choices[0]?.message?.content || 'No response from OpenAI',
      });

      this.server.emit('responseFromOpenAI', assistantMessage);
    } catch (error) {
      console.error(error);
      this.server.emit('responseFromOpenAI', { message: 'Error from OpenAI' });
    }
  }
}
