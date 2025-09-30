
import { BullModule } from '@nestjs/bullmq';
import { Module } from '@nestjs/common';

@Module({
    imports: [
        BullModule.registerQueue({
            name: 'generate-report'
        })
    ]
})
export class WorkerModule { }
