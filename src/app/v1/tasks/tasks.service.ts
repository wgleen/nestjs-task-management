import {
  Injectable,
  NotFoundException
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/user.entity';
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

  async getTasks(getTasksFilterDto: GetTasksFilterDto): Promise<Task[]> {
    const {
      status,
      search
    } = getTasksFilterDto

    const query = this.taskRepository.createQueryBuilder();

    if (status) {
      query.andWhere('status = :status', { status })
    }

    if (search) {
      query.andWhere('(title LIKE :search OR description LIKE :search)', { search: `%${search}%` })
    }

    const tasks = await query.getMany();

    return tasks;
  }

  async getTaskById(
    id: number,
    user: User
  ): Promise<Task> {
    const task = await this.taskRepository.findOneByIdAndUser(id, user);

    if (!task) throw new NotFoundException();

    return task;
  }

  async createTask(
    createTaskDto: CreateTaskDto,
    user: User
  ): Promise<Task> {
    return await this.taskRepository.createTaskByUser(createTaskDto, user);
  }

  async updateTaskStatus(
    id: number,
    updateTaskStatusDto: UpdateTaskStatusDto,
    user: User
  ): Promise<Task> {
    const task: Task = await this.getTaskById(id, user);

    this.taskRepository.merge(task, updateTaskStatusDto);

    const updated = await this.taskRepository.save(task);

    return updated;
  }

  async deleteTaskById(id: number): Promise<void> {
    const deleted = await this.taskRepository.delete(id)

    if (deleted.affected === 0) throw new NotFoundException();
  }
}
