import { Express } from 'express';
import { ExpressAdapter } from '@nestjs/platform-express';
import { INestApplication } from '@nestjs/common';
import { NestFactoryStatic } from '@nestjs/core/nest-factory';
import { V1Module } from './v1.module';
import { buildV1Documentation } from './v1.swagger';

export const createApp = async (server: Express): Promise<INestApplication> => {
  const appFactory = new NestFactoryStatic();
  const app = await appFactory
    .create(
      V1Module,
      new ExpressAdapter(server)
    );

  app.setGlobalPrefix('api/v1');

  buildV1Documentation(app);

  return app.init();
}
