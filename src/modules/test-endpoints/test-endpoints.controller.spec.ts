import { Test, TestingModule } from '@nestjs/testing';
import { TestEndpointsController } from './test-endpoints.controller';

describe('TestEndpointsController', () => {
  let controller: TestEndpointsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TestEndpointsController],
    }).compile();

    controller = module.get<TestEndpointsController>(TestEndpointsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
