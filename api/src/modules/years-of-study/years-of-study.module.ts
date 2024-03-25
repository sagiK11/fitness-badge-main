import { Module } from '@nestjs/common';
import { YearsOfStudyService } from './years-of-study.service';
import { YearsOfStudyController } from './years-of-study.controller';
import { ClassroomsModule } from '../classrooms/classrooms.module';
import { TeachersModule } from '../teachers/teachers.module';
import { StudentsModule } from '../students/students.module';
import { PrismaModule, ResultModule } from '@src/libs/infrastructure';

@Module({
  imports: [
    PrismaModule,
    ClassroomsModule,
    TeachersModule,
    StudentsModule,
    ResultModule,
  ],
  providers: [YearsOfStudyService],
  controllers: [YearsOfStudyController],
  exports: [YearsOfStudyService],
})
export class YearsOfStudyModule {}
