import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { DataModule } from './modules/data/data.module';
import { PrismaModule } from './modules/prisma/prisma.module';

@Module({
  imports: [UserModule, DataModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
