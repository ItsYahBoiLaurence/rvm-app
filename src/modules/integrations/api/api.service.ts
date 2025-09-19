import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { ApiKeyUserType } from 'src/types/apiKey';

@Injectable()
export class ApiService {
    constructor(
        private readonly prisma: PrismaService
    ) { }

    sayHello() {
        return { success: true }
    }

    async getAllData(api: ApiKeyUserType) {

        const { rvmList } = api

        const rvmID = rvmList.map((rvm) => rvm.rvmId)

        const transactions = await this.prisma.transactionData.findMany({
            where: {
                rvmID: {
                    in: rvmID
                }
            }
        })

        if (!transactions) throw new NotFoundException("No transaction found!")
        return transactions
    }

}
