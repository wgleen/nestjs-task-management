import { Module } from '@nestjs/common';
import { 
  ConfigModule,
  ConfigService
} from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import databaseConfig from './config/database.config'
import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [databaseConfig]
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => (
        configService.get('database')
      ),
      inject: [ConfigService]
    }),
    TasksModule
  ],
})
export class AppModule {}
