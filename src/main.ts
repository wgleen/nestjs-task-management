import * as http from 'http';
import * as express from 'express';
import { ExpressAdapter } from '@nestjs/platform-express';
import { NestFactoryStatic } from '@nestjs/core/nest-factory';
import { buildV1Documentation } from './app/v1/v1.swagger';
import { V1Module } from './app/v1/v1.module';

async function bootstrap() {
  const server = express();

  const appV1Factory = new NestFactoryStatic();
  const appV1 = await appV1Factory
    .create(
      V1Module,
      new ExpressAdapter(server)
    );

  appV1.setGlobalPrefix('api/v1');

  buildV1Documentation(appV1);

  await appV1.init();

  http
    .createServer(server)
    .listen(3000);
}
bootstrap();
