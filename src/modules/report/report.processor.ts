import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Logger } from '@nestjs/common';
import { Job } from 'bullmq';
import { ReportService } from './report.service';
import { ExcelService } from '../excel/excel.service';

@Processor('generate-report-queue')
export class GenerateReportQueue extends WorkerHost {
  private readonly logger = new Logger(GenerateReportQueue.name);

  constructor(
    private readonly reportService: ReportService,
    private readonly excelService: ExcelService,
  ) {
    super();
  }

  async process(job: Job) {
    this.logger.log(job.name);
    const rawExcelData = await this.reportService.generateExcelData();
    const excelFile = await this.excelService.generateExcelFile(rawExcelData);

    try {
      const response = await this.reportService.sendExcelFileToOtherApi(
        Buffer.from(excelFile),
      );
      this.logger.log('***************************');
      this.logger.log(response);
      this.logger.log('***************************');
    } catch (e) {
      this.logger.error(e);
    }
  }
}
