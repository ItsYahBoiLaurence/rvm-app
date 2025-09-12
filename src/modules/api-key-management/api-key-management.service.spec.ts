import { Test, TestingModule } from '@nestjs/testing';
import { ApiKeyManagementService } from './api-key-management.service';

describe('ApiKeyManagementService', () => {
  let service: ApiKeyManagementService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ApiKeyManagementService],
    }).compile();

    service = module.get<ApiKeyManagementService>(ApiKeyManagementService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
