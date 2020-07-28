import { Test, TestingModule } from '@nestjs/testing';
import { TasksServiceV1 } from './tasks.service';

describe('TasksService', () => {
  let service: TasksServiceV1;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TasksServiceV1],
    }).compile();

    service = module.get<TasksServiceV1>(TasksServiceV1);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
