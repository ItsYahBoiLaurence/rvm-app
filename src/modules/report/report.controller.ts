import { Controller, Get } from '@nestjs/common';
import { ReportService } from './report.service';
import { ExcelService } from '../excel/excel.service';

@Controller('report')
export class ReportController {
  constructor(
    private readonly reportService: ReportService,
    private readonly excelService: ExcelService,
  ) {}

  @Get('transaction')
  async getTransaction() {
    const rawExcelData = await this.reportService.generateExcelData();
    const excelFile = await this.excelService.generateExcelFile(rawExcelData);
    return this.reportService.sendExcelFileToOtherApi(Buffer.from(excelFile));
  }
}
