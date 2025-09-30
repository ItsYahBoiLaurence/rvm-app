import { Processor, WorkerHost } from "@nestjs/bullmq";
import { Job } from "bullmq";

@Processor('generate-report')
export class GenerateExcelReportProcessor extends WorkerHost {
    async process(job: Job<{ name: string }>) {
        await new Promise((resolve) => setTimeout(resolve, 5000));
        console.log(`${JSON.stringify(job)} Queued Done!`)
        return { success: true, message: "Success" }
    }
}