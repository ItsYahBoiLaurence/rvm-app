import { Module } from '@nestjs/common';
import { TestEndpointsService } from './test-endpoints.service';
import { TestEndpointsController } from './test-endpoints.controller';
import { ExcelModule } from '../excel/excel.module';
import { HttpModule } from '@nestjs/axios';

@Module({
  providers: [TestEndpointsService],
  controllers: [TestEndpointsController],
  imports: [ExcelModule, HttpModule],
})
export class TestEndpointsModule {}
