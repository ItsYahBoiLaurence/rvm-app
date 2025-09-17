import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { DataModule } from './modules/data/data.module';
import { PrismaModule } from './modules/prisma/prisma.module';
import { ApiKeyManagementModule } from './modules/api-key-management/api-key-management.module';
import { IntegrationsModule } from './modules/integrations/integrations.module';

@Module({
  imports: [UserModule, DataModule, PrismaModule, ApiKeyManagementModule, IntegrationsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
