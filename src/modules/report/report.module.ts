import { Module } from '@nestjs/common';
import { ReportService } from './report.service';
import { HttpModule } from '@nestjs/axios';
import { ReportController } from './report.controller';
import { ExcelModule } from '../excel/excel.module';
import { PrismaModule } from '../prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  providers: [ReportService],
  imports: [HttpModule, ExcelModule, PrismaModule, ConfigModule],
  controllers: [ReportController],
})
export class ReportModule {}
