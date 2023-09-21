import { Controller, Post, Get, Body } from '@nestjs/common';
import { OpenAiService } from './openAi.service';
import { Message } from 'src/models/message.model';

@Controller('') // Specify the base route for this controller
export class OpenAiController {
  constructor(private readonly openAiService: OpenAiService) {}

  @Get('/messages') // Define a GET route to retrieve all messages
  async findAllMessages(): Promise<Message[]> {
    const messages = await this.openAiService.getAllMessages();

    return messages;
  }

  @Post('/generate-story')
  async generateUserStory(@Body() requestBody) {
    const { userStoryInput } = requestBody;

    // Call the generateUserStory method to generate and return the user story
    const generatedStory =
      await this.openAiService.generateUserStory(userStoryInput);

    return { generatedStory };
  }
}
