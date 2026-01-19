import { Module } from '@nestjs/common';
import { ReportService } from './report.service';
import { HttpModule } from '@nestjs/axios';
import { ReportController } from './report.controller';
import { ExcelModule } from '../excel/excel.module';
import { PrismaModule } from '../prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { ReportCronService } from './report.cron';

@Module({
  providers: [ReportService, ReportCronService], //GenerateReportQueue
  imports: [
    HttpModule,
    ExcelModule,
    PrismaModule,
    ConfigModule,
    // BullModule.registerQueue({
    //   name: 'generate-report-queue',
    // }),
  ],
  controllers: [ReportController],
})
export class ReportModule {}
