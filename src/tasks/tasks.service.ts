import { v4 as uuidv4 } from 'uuid';
import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import {
  Task,
  TaskStatus
} from './task.model';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';


@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getTasks(getTasksFilterDto: GetTasksFilterDto): Task[] {
    if (Object.keys(getTasksFilterDto).length === 0) return this.tasks;

    const {
      status,
      search
    } = getTasksFilterDto;

    return this.tasks.filter((task): boolean => (
      (task.status === status)
      || (
        !!search
        && (
          task.title.includes(search)
          || task.description.includes(search)
        )
      )
    ));
  }

  createTask(createTaskDto: CreateTaskDto): Task {
    const {
      title,
      description
    } = createTaskDto;

    const task: Task = {
      id: uuidv4(),
      title,
      description,
      status: TaskStatus.OPEN
    };

    this.tasks.push(task);

    return task;
  }

  getTaskById(id: string): Task {
    return this.tasks.find((task): boolean => task.id === id);
  }

  updateTaskStatus(id: string, updateTaskStatusDto: UpdateTaskStatusDto): Task {
    const { status } = updateTaskStatusDto;
    const task: Task = this.getTaskById(id);

    task.status = status;

    return task;
  }

  deleteTaskById(id: string): void {
    const index: number = this.tasks.findIndex((task): boolean => task.id === id);

    if (index > -1) this.tasks.splice(index, 1);
  }
}
