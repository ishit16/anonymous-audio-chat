import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const cors = {
    origin: ['http://localhost:3000'],
    credentials: true,
    exposedHeaders: ['set-cookie'],
  };
  const app = await NestFactory.create(AppModule, { cors: cors });
  await app.listen(8000);
}
bootstrap();
