import { Module } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { ReportsController } from './reports.controller';
import { ExcellModule } from '../excell/excell.module';
import { SftpModule } from '../sftp/sftp.module';

@Module({
  imports: [ExcellModule, SftpModule],
  providers: [ReportsService],
  controllers: [ReportsController]
})
export class ReportsModule { }
