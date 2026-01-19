import { InjectQueue } from '@nestjs/bullmq';
import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { Queue } from 'bullmq';

@Injectable()
export class ReportCronService {
  private readonly logger = new Logger(ReportCronService.name);

  constructor() // @InjectQueue('generate-report-queue')
  // private readonly generateReportQueue: Queue,
  {}

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
  }
}
