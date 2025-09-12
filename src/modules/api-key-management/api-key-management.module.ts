import { Module } from '@nestjs/common';
import { ApiKeyManagementController } from './api-key-management.controller';
import { ApiKeyManagementService } from './api-key-management.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  controllers: [ApiKeyManagementController],
  imports: [PrismaModule],
  providers: [ApiKeyManagementService]
})
export class ApiKeyManagementModule { }
