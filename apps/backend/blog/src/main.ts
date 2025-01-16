import * as cookieParser from 'cookie-parser';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupSwagger } from './config/swagger.config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // cors
  const corsOrigin =
    process.env.NODE_ENV === 'production'
      ? 'https://www.example.com'
      : 'http://localhost:3000';
  app.enableCors({
    origin: corsOrigin,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  });
  // cookie parser
  app.use(cookieParser());
  // swagger 세팅 진행
  setupSwagger(app);
  // dto validator 추가
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  await app.listen(process.env.PORT ?? 8080);
}
bootstrap();
