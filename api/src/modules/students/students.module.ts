import { Module } from '@nestjs/common';
import { StudentsService } from './students.service';
import { StudentsController } from './students.controller';
import { PrismaModule, ResultModule } from '@src/libs/infrastructure';
import { TestCategoriesModule } from '../test-categories/test-categories.module';

@Module({
  providers: [StudentsService],
  controllers: [StudentsController],
  imports: [PrismaModule, ResultModule, TestCategoriesModule],
  exports: [StudentsService],
})
export class StudentsModule {}
