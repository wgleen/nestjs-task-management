import { Test, TestingModule } from '@nestjs/testing';
import { AuthServiceV1 } from './auth.service';

describe('AuthService', () => {
  let service: AuthServiceV1;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthServiceV1],
    }).compile();

    service = module.get<AuthServiceV1>(AuthServiceV1);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
