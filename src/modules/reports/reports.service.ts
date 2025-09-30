import { ConflictException, Injectable } from '@nestjs/common';
import { ExcellService } from '../excell/excell.service';
import { SftpService } from '../sftp/sftp.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ReportsService {

    private serverFilePath: string

    constructor(
        private readonly excelService: ExcellService,
        private readonly sftpService: SftpService,
        private readonly config: ConfigService
    ) {
        this.serverFilePath = this.config.get<string>("SERVER_FILE_PATH") ?? ""
    }

    async getReport() {
        return this.excelService.generateExcelFile()
    }

    async sendToServer() {
        const fileBuffer = await this.excelService.generateExcelFile()
        try {
            const send = await this.sftpService.uploadData(fileBuffer, `${this.serverFilePath}/TRANSACTION_DATA_${new Date().toDateString()}.xlsx`)
            return { success: true, message: send }
        } catch (e) {
            console.log(e)
            throw new ConflictException(e)
        }
    }

    // @InjectQueue('generate-report') private generate: Queue,
    // async test() {
    //     const data: { name: string } = {
    //         name: 'laurence'
    //     }
    //     await this.generate.add('generate-report', data)
    //     return { message: "Queue success!" }
    // }
}
