import { Module } from '@nestjs/common';
import { ExcellService } from './excell.service';

@Module({
  providers: [ExcellService],
  exports: [ExcellService]
})
export class ExcellModule { }
