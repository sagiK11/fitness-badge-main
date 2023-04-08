import { Controller, Get, Query } from '@nestjs/common';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { StudentsService } from './students.service';
import { Student } from '@prisma/client';
import { StudentDto } from './dto/student.dto';

@ApiTags('students')
@Controller({ path: 'students', version: '1' })
export class StudentsController {
  constructor(private readonly studentService: StudentsService) {}

  @Get()
  @ApiCreatedResponse({ type: StudentDto, isArray: true })
  async getAllStudents(
    @Query('schoolId') schoolId: string,
  ): Promise<Student[]> {
    const result = await this.studentService.findMany({ schoolId });
    if (!result.success) throw result.httpException;
    return result.data;
  }
}
