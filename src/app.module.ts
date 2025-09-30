import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { DataModule } from './modules/data/data.module';
import { PrismaModule } from './modules/prisma/prisma.module';
import { ApiKeyManagementModule } from './modules/api-key-management/api-key-management.module';
import { IntegrationsModule } from './modules/integrations/integrations.module';
import { WorkerModule } from './modules/worker/worker.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { BullModule } from '@nestjs/bullmq';
import { GenerateExcelReportProcessor } from './modules/worker/workers/generate-excel-report.processor';
import { ExcellModule } from './modules/excell/excell.module';
import { ExcellService } from './modules/excell/excell.service';
import { SftpModule } from './modules/sftp/sftp.module';
import { SftpService } from './modules/sftp/sftp.service';
import { ReportsModule } from './modules/reports/reports.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UserModule,
    DataModule,
    PrismaModule,
    ApiKeyManagementModule,
    IntegrationsModule,
    WorkerModule,
    BullModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        connection: {
          host: config.get<string>("REDIS_HOST"),
          port: config.get<number>("REDIS_PORT"),
          password: config.get<string>("REDIS_PASSWORD"),
          tls: {}
        }
      })
    }),
    ExcellModule,
    SftpModule,
    ReportsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
