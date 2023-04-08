import { Module } from '@nestjs/common';
import { ClassroomsService } from './classrooms.service';
import { ClassroomsController } from './classrooms.controller';
import { PrismaModule } from '@src/prisma/prisma.module';
import { TeachersModule } from '../teachers/teachers.module';
import { YearsOfStudyModule } from '../years-of-study/years-of-study.module';
import { ResultModule } from '@src/utils/result/result.module';

@Module({
  imports: [PrismaModule, TeachersModule, ResultModule],
  providers: [ClassroomsService],
  controllers: [ClassroomsController],
  exports: [ClassroomsService],
})
export class ClassroomsModule {}
