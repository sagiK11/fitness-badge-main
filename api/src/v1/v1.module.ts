import { Module } from '@nestjs/common';
import { ResultModule } from '@src/utils/result/result.module';
import { TeachersModule } from './teachers/teachers.module';
import { YearsOfStudyModule } from './years-of-study/years-of-study.module';
import { ClassroomsModule } from './classrooms/classrooms.module';

@Module({
  imports: [TeachersModule, YearsOfStudyModule, ResultModule, ClassroomsModule],
})
export class V1Module {}
