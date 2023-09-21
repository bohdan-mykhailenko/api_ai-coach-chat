import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { initDB } from './database/initDB';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');
  app.enableCors();

  await initDB().authenticate();
  await initDB().sync({ alter: true });
  await app.listen(5000);
}

bootstrap();
