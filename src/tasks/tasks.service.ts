import {
  Injectable,
  NotFoundException
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like } from 'typeorm';
import { TaskRepository } from './task.repository';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository)
    private taskRepository: TaskRepository
  ) {}

  getTasks(getTasksFilterDto: GetTasksFilterDto): Promise<Task[]> {
  }

  async getTaskById(id: number): Promise<Task> {
    const task = await this.taskRepository.findOne(id);

    if (!task) throw new NotFoundException();

    return task;
  }

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const task = await this.taskRepository.create(createTaskDto);

    const created = await this.taskRepository.save(task);

    return created;
  }

  async updateTaskStatus(id: number, updateTaskStatusDto: UpdateTaskStatusDto): Promise<Task> {
    const task: Task = await this.getTaskById(id);

    this.taskRepository.merge(task, updateTaskStatusDto);

    const updated = await this.taskRepository.save(task);

    return updated;
  }

  async deleteTaskById(id: number): Promise<Task> {
    const task = await this.getTaskById(id);

    return this.taskRepository.remove(task);
  }
}
