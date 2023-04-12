import { Body, Controller, Get, Param, Put, Query } from '@nestjs/common';
import { ApiCreatedResponse, ApiParam, ApiTags } from '@nestjs/swagger';
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

  @Put('/students/:studentId')
  @ApiCreatedResponse({ type: StudentDto })
  @ApiParam({ name: 'studentId', required: true })
  async updateStudent(
    @Param('studentId') studentId: string,
    @Body() payload: StudentDto,
  ): Promise<Student> {
    const result = await this.studentService.update(studentId, payload);
    if (!result.success) throw result.httpException;
    return result.data;
  }
}
