import { Test, TestingModule } from '@nestjs/testing';
import { ApiKeyManagementController } from './api-key-management.controller';

describe('ApiKeyManagementController', () => {
  let controller: ApiKeyManagementController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ApiKeyManagementController],
    }).compile();

    controller = module.get<ApiKeyManagementController>(ApiKeyManagementController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
