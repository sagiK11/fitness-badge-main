import { Module } from '@nestjs/common';
import { PrismaModule } from '@src/prisma/prisma.module';
import { TeachersService } from './teachers.service';
import { StudentsModule } from '@src/v1/students/students.module';
import { YearsOfStudyModule } from '@src/v1/years-of-study/years-of-study.module';
import { TeachersController } from './teachers.controller';

@Module({
  imports: [PrismaModule, StudentsModule, YearsOfStudyModule],
  controllers: [TeachersController],
  providers: [TeachersService],
})
export class TeachersModule {}
