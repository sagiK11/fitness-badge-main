import { Module } from '@nestjs/common';
import { PrismaModule } from '@src/prisma/prisma.module';
import { YearsOfStudyService } from './years-of-study.service';

@Module({
  imports: [PrismaModule],
  providers: [YearsOfStudyService],
  exports: [YearsOfStudyService],
})
export class YearsOfStudyModule {}
