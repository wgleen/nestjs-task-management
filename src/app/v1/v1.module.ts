import * as compression from 'compression';
import * as helmet from 'helmet';
import {
  Module,
  MiddlewareConsumer
} from '@nestjs/common';
import {
  ConfigModule,
  ConfigService
} from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import jwtConfig from 'src/config/jwt.config';
import databaseConfig from '../../config/database.config';
import { UsersModule } from './users/users.module';
import { TasksModule } from './tasks/tasks.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [
        databaseConfig,
        jwtConfig
      ]
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => (
        configService.get('database')
      ),
      inject: [ConfigService]
    }),
    TasksModule,
    AuthModule,
    UsersModule
  ],
})
export class V1Module {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(compression());
    consumer.apply(helmet());
  }
}
