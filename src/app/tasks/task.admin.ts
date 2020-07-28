import { AdminEntity } from 'nestjs-admin';
import { Task } from './task.entity';

export class TaskAdmin extends AdminEntity {
  entity = Task;
  listDisplay = ['id', 'title', 'description', 'status'];
  searchFields = ['id', 'title', 'status'];
}
