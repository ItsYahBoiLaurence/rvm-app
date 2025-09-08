import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Data } from 'src/types/data';
import { DataDTO } from './dto/create-data.dto';
import { timeStamp } from 'console';

@Injectable()
export class DataService {

    private logger = new Logger(DataService.name)
    constructor(
        private readonly prisma: PrismaService
    ) { }

    async greet() {
        this.logger.log("Hello from the Data Service")
        return this.prisma.transactionData.findMany()
    }

    async userRecycleData(payload: DataDTO) {
        this.logger.log(payload)
        const { rvmID, timestamp, totalCount, totalValue, item, messageID, userID, sign } = payload
        try {
            await this.prisma.transactionData.create({
                data: {
                    rvmID,
                    timestamp,
                    totalCount,
                    totalValue,
                    item,
                    messageID,
                    userID,
                    sign
                }
            })
            return { code: 0, message: 'success' }
        } catch (e) {
            this.logger.log(e)
            throw e
        }
    }
}
