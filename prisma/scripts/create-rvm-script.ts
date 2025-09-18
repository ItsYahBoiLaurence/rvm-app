import { NotFoundException } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

type RVMQuery = {
    rvmID: "string"
}

async function main() {
    const uniqueRVMID = await prisma.$queryRaw<RVMQuery[]>`
        SELECT DISTINCT "rvmID" FROM "TransactionData"
    `

    if (uniqueRVMID.length === 0) throw new NotFoundException('No RVM IDs found!')

    const data = uniqueRVMID.map((rvm) => {
        return { rvmId: rvm.rvmID }
    })

    const createRVM = await prisma.rVM.createMany({
        data
    })

    console.log(createRVM)
}

main().catch((e) => {
    console.log(e)
    process.exit(1)
}).finally(async () => await prisma.$disconnect())