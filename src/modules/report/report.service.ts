import { HttpService } from '@nestjs/axios';
import { Injectable, NotFoundException } from '@nestjs/common';
import * as FormData from 'form-data';
import { firstValueFrom } from 'rxjs';
import { PrismaService } from '../prisma/prisma.service';
import { ExcelRecordType } from 'src/types/excel-file';
import { ConfigService } from '@nestjs/config';
import { formatDateToDB, getReportRangeDate } from 'src/libs/formatDate';

@Injectable()
export class ReportService {
  constructor(
    private readonly axios: HttpService,
    private readonly prisma: PrismaService,
    private readonly config: ConfigService,
  ) {}

  async sendExcelFileToOtherApi(fileBuffer: Buffer) {
    const form = new FormData();

    const date = new Date();

    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
    const day = String(date.getUTCDate()).padStart(2, '0');

    form.append('file', fileBuffer as unknown as Buffer, {
      filename: `TranUpload_RVMsustainability${year}_QualityReport_${month + day + year}.xlsx`,
      contentType:
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });

    const rawResponse = this.axios.post(
      this.config.get<string>('TUNNEL_API')!,
      form,
      {
        headers: form.getHeaders(),
      },
    );

    const response = await firstValueFrom(rawResponse);

    return response.data;
  }

  async generateExcelData() {
    const now = new Date();

    const { startDate, endDate } = getReportRangeDate(now);

    const rawTransactions = await this.prisma.transactionData.findMany({
      where: {
        rvmID: 'BPIBuendia',
        timestamp: {
          gte: formatDateToDB(startDate),
          lte: formatDateToDB(endDate),
        },
      },
      select: {
        userID: true,
        totalValue: true,
        timestamp: true,
      },
      orderBy: {
        timestamp: 'asc',
      },
    });

    if (!rawTransactions) return [];

    return rawTransactions.map((rawTransaction) => {
      const rawDate = new Date(rawTransaction.timestamp.replace(' ', 'T'));

      const txnDate =
        String(rawDate.getDate()).padStart(2, '0') +
        String(rawDate.getMonth() + 1).padStart(2, '0') +
        rawDate.getFullYear();

      return {
        txnDate,
        mobileNumber: rawTransaction.userID ?? '',
        memberUserName: '',
        accountNumber: '',
        divisionName: 'Loyalty',
        txnType: 'RVM sustainability',
        activityName: '',
        txnamount: Number(rawTransaction.totalValue),
      };
    });
  }
}
