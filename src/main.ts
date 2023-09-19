import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Register the OpenAiController and OpenAiService
  app.setGlobalPrefix('api');
  app.enableCors();

  await app.listen(5000);
}

bootstrap();
