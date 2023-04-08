import { Module } from '@nestjs/common';
import { PrismaModule } from '@src/prisma/prisma.module';
import { YearsOfStudyService } from './years-of-study.service';
import { YearsOfStudyController } from './years-of-study.controller';
import { ClassroomsModule } from '../classrooms/classrooms.module';
import { TeachersModule } from '../teachers/teachers.module';
import { StudentsModule } from '../students/students.module';

@Module({
  imports: [PrismaModule, ClassroomsModule, TeachersModule, StudentsModule],
  providers: [YearsOfStudyService],
  controllers: [YearsOfStudyController],
  exports: [YearsOfStudyService],
})
export class YearsOfStudyModule {}
