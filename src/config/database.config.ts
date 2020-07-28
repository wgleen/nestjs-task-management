import * as dotenv from 'dotenv';
import * as path from 'path';
import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

dotenv.config();

const ADMIN_USER_ENTITIES_ENTRIES = 'node_modules/nestjs-admin/**/*.entity.js';
const ENTITIES_ENTRIES: string = path.join(__dirname, '../app/**/*.entity.{js,ts}');
const SUBSCRIBERS_ENTRIES: string = path.join(__dirname, '../app/**/*.subscriber.{js,ts}');
const MIGRATIONS_ENTRIES: string = path.join(__dirname, '../db/migrations/*.{js,ts}');

export const config: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  entities: [
    ENTITIES_ENTRIES,
    ADMIN_USER_ENTITIES_ENTRIES
  ],
  subscribers: [SUBSCRIBERS_ENTRIES],
  synchronize: false,
  migrationsRun: false,
  migrations: [MIGRATIONS_ENTRIES],
  cli: {
    migrationsDir: 'src/db/migrations',
  },
  logging: true,

}

export default registerAs('database', (): TypeOrmModuleOptions => config);
