import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { buildV1Documentation } from './app/app.swagger'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //app.setGlobalPrefix('api')

  buildV1Documentation(app);

  await app.listen(3000);
}
bootstrap();
