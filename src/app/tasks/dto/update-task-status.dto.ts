import {
  IsNotEmpty,
  IsEnum
} from 'class-validator';
import { Task } from '../task.entity';
import { TaskStatus } from '../enums/task-status.enum';

export class UpdateTaskStatusDto {
  @IsNotEmpty()
  @IsEnum(Task)
  status: TaskStatus;
}
