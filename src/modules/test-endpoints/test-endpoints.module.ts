import { Module } from '@nestjs/common';
import { TestEndpointsService } from './test-endpoints.service';
import { TestEndpointsController } from './test-endpoints.controller';

@Module({
  providers: [TestEndpointsService],
  controllers: [TestEndpointsController]
})
export class TestEndpointsModule {}
