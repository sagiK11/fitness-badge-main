import { Module } from '@nestjs/common';
import { PrismaModule } from '@src/prisma/prisma.module';
import { TeachersService } from './teachers.service';
import { YearsOfStudyModule } from '@src/v1/years-of-study/years-of-study.module';
import { TeachersController } from './teachers.controller';
import { ResultModule } from '@src/utils/result/result.module';

@Module({
  imports: [PrismaModule, YearsOfStudyModule, ResultModule],
  controllers: [TeachersController],
  providers: [TeachersService],
})
export class TeachersModule {}
