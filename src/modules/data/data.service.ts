import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { DataDTO } from './dto/create-data.dto';

@Injectable()
export class DataService {

    private logger = new Logger(DataService.name)
    constructor(
        private readonly prisma: PrismaService
    ) { }

    async getAllData() {
        try {
            const data = await this.prisma.transactionData.findMany()
            return data
        } catch (error) {
            this.logger.log(error)
        }
    }

    async userRecycleData(payload: DataDTO) {
        const { rvmID, timestamp, totalCount, totalValue, item, messageID, userID, sign } = payload
        try {
            const createTransaction = await this.prisma.transactionData.create({
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
            await this.prisma.rVM.upsert({
                where: {
                    rvmId: createTransaction.rvmID
                },
                update: {},
                create: {
                    rvmId: createTransaction.rvmID
                }
            })
            return { code: 0, message: 'success' }
        } catch (e) {
            this.logger.log(e)
            throw e
        }
    }
}
