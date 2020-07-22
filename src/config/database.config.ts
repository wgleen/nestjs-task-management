import * as path from 'path';
import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

const ENTITIES_ENTRIES: string = path.join(__dirname, '../**/*.entity.{js,ts}')
const SUBSCRIBERS_ENTRIES: string = path.join(__dirname, '../**/*.subscriber.{js,ts}')

export default registerAs('database', (): TypeOrmModuleOptions => ({
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  entities: [ENTITIES_ENTRIES],
  subscribers: [SUBSCRIBERS_ENTRIES],
  synchronize: true
}));
