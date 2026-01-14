import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { DataModule } from './modules/data/data.module';
import { PrismaModule } from './modules/prisma/prisma.module';
import { ApiKeyManagementModule } from './modules/api-key-management/api-key-management.module';
import { TestEndpointsModule } from './modules/test-endpoints/test-endpoints.module';
import { ExcelModule } from './modules/excel/excel.module';
import { ReportModule } from './modules/report/report.module';
import { ScheduleModule } from '@nestjs/schedule';
import { BullModule } from '@nestjs/bullmq';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UserModule,
    DataModule,
    PrismaModule,
    ApiKeyManagementModule,
    TestEndpointsModule,
    ExcelModule,
    ReportModule,
    ScheduleModule.forRoot(),
    BullModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        connection: {
          host: configService.get<string>('REDIS_HOSTNAME'),
          port: configService.get<number>('REDIS_PORT'),
          password: configService.get<string>('REDIS_PASSWORD'),
          tls: {},
          maxRetriesPerRequest: null,
          enableReadyCheck: false,
        },
      }),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
