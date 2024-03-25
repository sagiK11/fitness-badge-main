import { Module } from '@nestjs/common';
import { PrismaModule } from '@src/libs/infrastructure/prisma/prisma.module';
import { ExceptionService } from './exception.service';
import { ResultService } from './result.service';

@Module({
  imports: [PrismaModule],
  providers: [ResultService, ExceptionService],
  exports: [ResultService],
})
export class ResultModule {}
