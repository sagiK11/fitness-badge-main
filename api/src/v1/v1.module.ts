import { Module } from '@nestjs/common';
import { ResultModule } from '@src/utils/result/result.module';
import { TeachersModule } from './teachers/teachers.module';
import { YearsOfStudyModule } from './years-of-study/years-of-study.module';
import { ClassroomsModule } from './classrooms/classrooms.module';
import { StudentsModule } from './students/students.module';
import { TestsModule } from './tests/tests.module';
import { SchoolsModule } from './schools/schools.module';
import { SystemConfigModule } from './system-config/system-config.module';
import { TestCategoriesModule } from './test-categories/test-categories.module';
import { AdminsModule } from './admins/admins.module';

@Module({
  imports: [TeachersModule, YearsOfStudyModule, ResultModule, ClassroomsModule, StudentsModule, TestsModule, SchoolsModule, SystemConfigModule, TestCategoriesModule, AdminsModule],
})
export class V1Module {}
