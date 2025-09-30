import { Injectable } from '@nestjs/common';
import * as ExcelJS from 'exceljs';

@Injectable()
export class ExcellService {

    async generateExcelFile() {
        const excel = new ExcelJS.Workbook()
        const worksheet = excel.addWorksheet('Sheet1')

        const data = [
            { id: null, name: 'Laurence', email: 'johnlaurenceburgos@gmail.com', createdAt: new Date() },
            { id: 2, name: 'Christa', email: 'christa@gmail.com', createdAt: new Date() },
            { id: 3, name: 'Mawi', email: 'mawi@gmail.com', createdAt: new Date() }
        ]

        worksheet.columns = [
            { header: 'ID', key: 'id' },
            { header: 'Name', key: 'name' },
            { header: 'Email', key: 'email' },
            { header: 'Created At', key: 'createdAt' }
        ];

        data.map((item) => {
            worksheet.addRow(item)
        })

        worksheet.getRow(1).eachCell(cell => {
            cell.font = { bold: true };
            cell.fill = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: { argb: 'FFE0E0E0' }
            };
        });

        const buffer = await excel.xlsx.writeBuffer()
        return Buffer.from(buffer)
    }

}
