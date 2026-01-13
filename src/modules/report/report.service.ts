import { HttpService } from '@nestjs/axios';
import { Injectable, NotFoundException } from '@nestjs/common';
import * as FormData from 'form-data';
import { firstValueFrom } from 'rxjs';
import { PrismaService } from '../prisma/prisma.service';
import { ExcelRecordType } from 'src/types/excel-file';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ReportService {
  constructor(
    private readonly axios: HttpService,
    private readonly prisma: PrismaService,
    private readonly config: ConfigService,
  ) {}

  async sendExcelFileToOtherApi(fileBuffer: Buffer) {
    const form = new FormData();

    form.append('file', fileBuffer as unknown as Buffer, {
      filename: `example-transaction.xlsx`,
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
    // TODO: Get the correct data...
    const rawTransactions = await this.prisma.transactionData.findMany({
      where: {
        rvmID: 'BPIBuendia',
      },
      select: {
        userID: true,
        totalValue: true,
        timestamp: true,
      },
      orderBy: {
        timestamp: 'desc',
      },
      take: 20,
    });

    if (!rawTransactions) return [];

    return rawTransactions.map((rawTransaction) => {
      const rawDate = new Date(rawTransaction.timestamp.replace(' ', 'T'));

      const txnDate =
        String(rawDate.getMonth() + 1).padStart(2, '0') +
        String(rawDate.getDate()).padStart(2, '0') +
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
