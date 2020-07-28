import { Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  Query,
  UsePipes,
  ValidationPipe,
  ParseIntPipe,
  UseGuards
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { User } from '../../users/user.entity';
import { Task } from '../task.entity';
import { TasksServiceV1 } from './tasks.service';
import { JwtAuthGuard } from '../../auth/jwt.guard';
import { CreateTaskDto } from '../dto/create-task.dto';
import { UpdateTaskStatusDto } from '../dto/update-task-status.dto';
import { GetTasksFilterDto } from '../dto/get-tasks-filter.dto';
import { GetUser } from '../../auth/decorators/get-user.decorator';

@ApiBearerAuth()
@ApiTags('Tasks')
@Controller('v1/tasks')
@UseGuards(JwtAuthGuard)
export class TasksController {
  constructor(private tasksService: TasksServiceV1) {}

  @Get()
  @ApiOperation({ summary: 'Get a list of Tasks' })
  @UsePipes(ValidationPipe)
  getTasks(@Query() getTasksFilterDto: GetTasksFilterDto): Promise<Task[]> {
    return this.tasksService.getTasks(getTasksFilterDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a single Taks by id' })
  getTaskById(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User
  ): Promise<Task> {
    return this.tasksService.getTaskById(id, user);
  }

  @Post()
  @ApiOperation({ summary: 'Create a single task' })
  @UsePipes(ValidationPipe)
  createTask(
    @Body() createTaskDto: CreateTaskDto,
    @GetUser() user: User
  ): Promise<Task> {
    return this.tasksService.createTask(createTaskDto, user);
  }

  @Patch(':id/status')
  @ApiOperation({ summary: 'Update a Task status by id' })
  @UsePipes(ValidationPipe)
  updateTaskStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTaskStatusDto: UpdateTaskStatusDto,
    @GetUser() user: User
  ): Promise<Task> {
    return this.tasksService.updateTaskStatus(id, updateTaskStatusDto, user);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a single task by id' })
  deleteTaskById(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.tasksService.deleteTaskById(id);
  }
}
