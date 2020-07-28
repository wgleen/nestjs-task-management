import {
  IsOptional,
  IsEnum,
  IsNotEmpty
} from 'class-validator';
import { Task } from '../task.entity';
import { TaskStatus } from '../enums/task-status.enum';

export class GetTasksFilterDto {
  @IsOptional()
  @IsEnum(Task)
  status: TaskStatus;

  @IsOptional()
  @IsNotEmpty()
  search: string;
}
