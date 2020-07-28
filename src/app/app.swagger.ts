import {
  SwaggerModule,
  DocumentBuilder
} from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';

const options = new DocumentBuilder()
  .setTitle('Tasks Management API')
  .setDescription('Tasks Management API description')
  .addBearerAuth()
  .build();

export const buildV1Documentation = (app: INestApplication): void => {
  const document = SwaggerModule.createDocument(app, options);

  SwaggerModule.setup('docs', app, document)
}
