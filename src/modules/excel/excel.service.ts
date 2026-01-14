import { Injectable } from '@nestjs/common';
import * as ExcelJS from 'exceljs';
import { ExcelRecordType } from 'src/types/excel-file';

@Injectable()
export class ExcelService {
  async generateExcelFile(data: ExcelRecordType[]) {
    const excel = new ExcelJS.Workbook();
    const worksheet = excel.addWorksheet('Sheet1');

    worksheet.columns = [
      { header: 'TXNDATE', key: 'txnDate' },
      { header: 'Mobile Number', key: 'mobileNumber' },
      { header: 'MEMBERUSERNAME', key: 'memberUserName' },
      { header: 'ACCOUNTNUMBER', key: 'accountNumber' },
      { header: 'DIVISIONNAME', key: 'divisionName' },
      { header: 'TXNTYPE', key: 'txnType' },
      { header: 'ACTIVITYNAME', key: 'activityName' },
      { header: 'TXNAMOUNT', key: 'txnamount' },
    ];

    for (const rowData of data) {
      worksheet.addRow(rowData);
    }

    worksheet.getRow(1).eachCell((cell) => {
      cell.font = { bold: true };
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FFE0E0E0' },
      };
    });

    worksheet.columns.forEach((column) => {
      let maxLength = 10;
      if (column.eachCell) {
        column.eachCell({ includeEmpty: true }, (cell) => {
          const cellValue = cell.value ? cell.value.toString() : '';
          maxLength = Math.max(maxLength, cellValue.length + 2);
        });
      }

      column.width = Math.min(maxLength, 50);
    });

    return excel.xlsx.writeBuffer();
  }
}
