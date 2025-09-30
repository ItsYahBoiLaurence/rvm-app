import { Controller, Get, Res } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { Response } from 'express';
import { ExcellService } from '../excell/excell.service';
import { SftpService } from '../sftp/sftp.service';

@Controller('reports')
export class ReportsController {

    constructor(
        private readonly service: ReportsService,
    ) { }

    @Get()
    async getReport(@Res() res: Response) {
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', 'attachment; filename=TranUpload_RVMsustainability2025_09192025.xlsx');
        res.send(await this.service.getReport())
    }

    @Get('sendToServer')
    sendReportToServer() {
        return this.service.sendToServer()
    }
}
