import { InjectQueue } from '@nestjs/bullmq';
import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Queue } from 'bullmq';
import { ReportService } from './report.service';
import { ExcelService } from '../excel/excel.service';

@Injectable()
export class ReportCronService {
  private readonly logger = new Logger(ReportCronService.name);

  constructor(
    private readonly reportService: ReportService,
    private readonly excelService: ExcelService,
  ) {} // private readonly generateReportQueue: Queue, // @InjectQueue('generate-report-queue')

  @Cron('0 7 * * 1', {
    timeZone: 'Asia/Manila',
  })
  async enqueueGenerateReport() {
    this.logger.log('Queuing Generate Exell job!');

    // await this.generateReportQueue.add(
    //   'Generate Report',
    //   {},
    //   {
    //     delay: 1000,
    //     attempts: 3,
    //     backoff: {
    //       type: 'exponential',
    //       delay: 2000,
    //     },
    //   },
    // );

    const rawExcelData = await this.reportService.generateExcelData();
    const excelFile = await this.excelService.generateExcelFile(rawExcelData);
    const report = this.reportService.sendExcelFileToOtherApi(
      Buffer.from(excelFile),
    );
    this.logger.log(report);
    return report;
  }
}
