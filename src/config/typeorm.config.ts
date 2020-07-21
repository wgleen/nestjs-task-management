import * as path from 'path'
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeORMConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'nestjs-task-management-user',
  password: 'qwerty',
  database: 'nestjs-task-management-dev',
  entities: [path.join(__dirname, '../**/*.entity.{js,ts}')],
  subscribers: [path.join(__dirname, '../**/*.subscriber.{js,ts}')],
  synchronize: true
};
