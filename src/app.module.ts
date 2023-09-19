import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OpenAiService } from './openAi/openAi.service';
import { OpenAiController } from './openAi/openAi.controller';

@Module({
  imports: [],
  controllers: [AppController, OpenAiController],
  providers: [AppService, OpenAiService],
})
export class AppModule {}
