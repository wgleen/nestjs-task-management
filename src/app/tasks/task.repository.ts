import {
  Repository,
  EntityRepository
} from 'typeorm';
import { User } from '../users/user.entity';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
  async createTaskByUser(
    createTaskDto: CreateTaskDto,
    user: User
  ): Promise<Task> {
    const {
      title,
      description
    } = createTaskDto;

    const task = new Task();

    task.title = title;
    task.description = description;
    task.user = user;

    await task.save();

    return task;
  }

  async findOneByIdAndUser(
    id: number,
    user: User
  ): Promise<Task> {
    return this.findOne({ id, user })
  }
}
