import { Controller, Post, Body } from '@nestjs/common';
import { OpenAiService } from './openAi.service';

@Controller()
export class OpenAiController {
  constructor(private readonly openAiService: OpenAiService) {}

  @Post('/generate-story')
  async generateUserStory(@Body() requestBody) {
    const { userStoryInput } = requestBody;

    const generatedStory =
      await this.openAiService.generateUserStory(userStoryInput);

    return { generatedStory };
  }
}
