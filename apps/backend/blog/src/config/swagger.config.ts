import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export function setupSwagger(app: INestApplication): void {
  const options = new DocumentBuilder()
    .setTitle('Blog API Docs') // API 명
    .setDescription('NestJS Swagger Blogs') // API 설명
    .setVersion('1.0.0') // 버전
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api/blog/swagger-ui/index.html', app, document); // API 문서 주소
}
