import { Controller, Get, Param, Query } from '@nestjs/common';

import { ClassroomsService } from './classrooms.service';
import { ApiOkResponse, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Classroom, Student } from '@prisma/client';
import { ClassRoomDto } from './dto/classroom.dto';
import { StudentDto } from '../students/dto/student.dto';

@ApiTags('classrooms')
@Controller({ path: 'classrooms', version: '1' })
export class ClassroomsController {
  constructor(private readonly classRoomsService: ClassroomsService) {}

  @Get()
  @ApiOkResponse({ type: ClassRoomDto, isArray: true })
  async findMany(): Promise<Classroom[]> {
    const result = await this.classRoomsService.findMany();
    if (!result.success) throw result.httpException;
    return result.data;
  }

  @Get()
  @ApiOkResponse({ type: ClassRoomDto, isArray: true })
  @ApiQuery({ name: 'schoolId', required: true })
  async findManyBySchool(
    @Query('schoolId') schoolId: string,
  ): Promise<Classroom[]> {
    const result = await this.classRoomsService.findManyBySchool({ schoolId });
    if (!result.success) throw result.httpException;
    return result.data;
  }

  @Get('/:classId/available-students')
  @ApiOkResponse({ type: StudentDto, isArray: true })
  @ApiParam({ name: 'classId', required: true })
  @ApiQuery({ name: 'schoolId', required: true })
  async findAvailableStudents(
    @Param('classId') classroomId: string,
    @Query('schoolId') schoolId: string,
    @Query('yearId') yearOfStudyId: string,
  ): Promise<Student[]> {
    const result = await this.classRoomsService.findAvailableStudents({
      yearOfStudyId,
      schoolId,
      classroomId,
    });
    if (!result.success) throw result.httpException;
    return result.data;
  }
}
