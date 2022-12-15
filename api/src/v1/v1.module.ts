import { Module } from '@nestjs/common';
import { ResultModule } from '@src/utils/result/result.module';
import { TeachersModule } from './teachers/teachers.module';
import { YearsOfStudyModule } from './years-of-study/years-of-study.module';

@Module({
  imports: [TeachersModule, YearsOfStudyModule, ResultModule],
})
export class V1Module {}
