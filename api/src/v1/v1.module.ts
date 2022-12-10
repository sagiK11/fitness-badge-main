import { Module } from '@nestjs/common';
import { TeachersModule } from './teachers/teachers.module';
import { YearsOfStudyModule } from './years-of-study/years-of-study.module';

@Module({
  imports: [TeachersModule, YearsOfStudyModule, YearsOfStudyModule],
  controllers: [],
})
export class V1Module {}
