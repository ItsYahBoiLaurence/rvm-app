import { Test, TestingModule } from '@nestjs/testing';
import { TestEndpointsService } from './test-endpoints.service';

describe('TestEndpointsService', () => {
  let service: TestEndpointsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TestEndpointsService],
    }).compile();

    service = module.get<TestEndpointsService>(TestEndpointsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
