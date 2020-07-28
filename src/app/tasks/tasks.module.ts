import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  DefaultAdminModule,
  DefaultAdminSite
} from 'nestjs-admin';
import { TaskAdmin } from './task.admin';
import { TaskRepository } from './task.repository';
import { TasksController } from './v1/tasks.controller';
import { TasksServiceV1 } from './v1/tasks.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([TaskRepository]),
    DefaultAdminModule
  ],
  controllers: [TasksController],
  providers: [TasksServiceV1]
})
export class TasksModule {
  constructor(private readonly adminSite: DefaultAdminSite) {
    adminSite.register('Task', TaskAdmin)
  }
}
