import { Module } from '@nestjs/common';
import { StudentsService } from './students.service';
import { StudentsController } from './students.controller';
import { YearsOfStudyModule } from '../years-of-study/years-of-study.module';
import { PrismaModule } from '@src/prisma/prisma.module';
import { ResultModule } from '@src/utils/result/result.module';
import { TestCategoriesModule } from '../test-categories/test-categories.module';

@Module({
  providers: [StudentsService],
  controllers: [StudentsController],
  imports: [PrismaModule, ResultModule, TestCategoriesModule],
  exports: [StudentsService],
})
export class StudentsModule {}
