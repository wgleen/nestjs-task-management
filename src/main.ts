import * as http from 'http';
import * as express from 'express';
import { createApp as createAppV1 } from './app/v1/v1.app'

async function bootstrap() {
  const server = express();

  createAppV1(server);

  http
    .createServer(server)
    .listen(3000);
}
bootstrap();
