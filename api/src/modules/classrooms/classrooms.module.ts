import { Module } from '@nestjs/common';
import { ClassroomsService } from './classrooms.service';
import { ClassroomsController } from './classrooms.controller';
import { TeachersModule } from '../teachers/teachers.module';
import { StudentsModule } from '../students/students.module';
import { PrismaModule, ResultModule } from '@src/libs/infrastructure';

@Module({
  imports: [PrismaModule, TeachersModule, ResultModule, StudentsModule],
  providers: [ClassroomsService],
  controllers: [ClassroomsController],
  exports: [ClassroomsService],
})
export class ClassroomsModule {}
