import {
  EntitySubscriberInterface,
  InsertEvent,
  EventSubscriber
} from 'typeorm';
import { Task } from './task.entity';
import { TaskStatus } from './enums/task-status.enum';

@EventSubscriber()
export class TaskSubscriber implements EntitySubscriberInterface<Task> {
  listenTo() {
    return Task;
  }

  beforeInsert(event: InsertEvent<Task>): void {
    event.entity.status = TaskStatus.OPEN;
  }
}