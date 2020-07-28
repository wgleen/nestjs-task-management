import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { config } from './src/config/database.config';

const ormConfig: TypeOrmModuleOptions = {
  ...config
}

export = ormConfig;
