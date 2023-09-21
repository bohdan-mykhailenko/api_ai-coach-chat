import { Controller, Post, Get, Body } from '@nestjs/common';
import { MessagesService } from '../services/messages.service';
import { Message } from 'src/models/message.model';

@Controller() // Specify the base route for this controller
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Get('/messages') // Define a GET route to retrieve all messages
  async findAllMessages(): Promise<Message[]> {
    const messages = await this.messagesService.getAllMessages();

    return messages;
  }

  @Post('/ai-response')
  async generateUserStory(@Body() requestBody) {
    const { userStoryInput } = requestBody;

    // Call the generateUserStory method to generate and return the user story
    const generatedStory =
      await this.messagesService.postUserStory(userStoryInput);

    return { generatedStory };
  }
}
