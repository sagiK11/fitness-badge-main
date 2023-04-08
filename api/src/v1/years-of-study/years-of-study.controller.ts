import { Controller, Get, Param, Put } from '@nestjs/common';

import { ApiCreatedResponse, ApiParam, ApiTags } from '@nestjs/swagger';

import { ClassroomsService } from '../classrooms/classrooms.service';
import { StudentsService } from '../students/students.service';
import { Classroom, Student } from '@prisma/client';
import { StudentDto } from '../students/dto/student.dto';
import { ClassRoomDto } from '../classrooms/dto/classroom.dto';

@ApiTags('years-of-study')
@Controller({ path: 'years-of-study', version: '1' })
export class YearsOfStudyController {
  constructor(
    private readonly classroomService: ClassroomsService,
    private readonly studentService: StudentsService,
  ) {}

  @Get('/:yearId/teachers/:teacherId/classrooms')
  @ApiParam({ name: 'yearId', required: true })
  @ApiParam({ name: 'teacherId', required: true })
  @ApiCreatedResponse({ type: ClassRoomDto, isArray: true })
  async findTeacherClassrooms(
    @Param('yearId') yearOfStudyId: string,
    @Param('teacherId') teacherId: string,
  ): Promise<Classroom[]> {
    const result = await this.classroomService.findTeacherClassrooms({
      yearOfStudyId,
      teacherId,
    });
    if (!result.success) throw result.httpException;
    return result.data;
  }

  @Put('/:yearId/teachers/:teacherId/classrooms/:classId')
  @ApiParam({ name: 'yearId', required: true })
  @ApiParam({ name: 'teacherId', required: true })
  @ApiParam({ name: 'classId', required: true })
  @ApiCreatedResponse({ type: ClassRoomDto })
  async addTeacherClassroom(
    @Param('yearId') yearOfStudyId: string,
    @Param('teacherId') teacherId: string,
    @Param('classId') classroomId: string,
  ): Promise<Classroom> {
    const result = await this.classroomService.addTeacherClassroom({
      yearOfStudyId,
      teacherId,
      classroomId,
    });
    if (!result.success) throw result.httpException;
    return result.data;
  }

  @Get('/:yearId/teachers/:teacherId/classrooms/:classId/')
  @ApiParam({ name: 'yearId', required: true })
  @ApiParam({ name: 'teacherId', required: true })
  @ApiParam({ name: 'classId', required: true })
  @ApiCreatedResponse({ type: ClassRoomDto })
  async findTeacherClassroom(
    @Param('yearId') yearOfStudyId: string,
    @Param('teacherId') teacherId: string,
    @Param('classId') classroomId: string,
  ): Promise<Classroom> {
    const result = await this.classroomService.findTeacherClassroom({
      yearOfStudyId,
      teacherId,
      classroomId,
    });
    if (!result.success) throw result.httpException;
    return result.data;
  }

  @Get('/:yearId/classrooms/:classId/students/:studentId')
  @ApiParam({ name: 'yearId', required: true })
  @ApiParam({ name: 'classId', required: true })
  @ApiParam({ name: 'studentId', required: true })
  @ApiCreatedResponse({ type: StudentDto })
  async findClassroomStudent(
    @Param('yearId') yearOfStudyId: string,
    @Param('classId') classroomId: string,
    @Param('studentId') studentId: string,
  ): Promise<Student> {
    const result = await this.studentService.findClassroomStudent({
      yearOfStudyId,
      classroomId,
      studentId,
    });
    if (!result.success) throw result.httpException;
    return result.data;
  }

  @Put('/:yearId/classrooms/:classId/students/:studentId')
  @ApiParam({ name: 'yearId', required: true })
  @ApiParam({ name: 'classId', required: true })
  @ApiParam({ name: 'studentId', required: true })
  @ApiCreatedResponse({ type: ClassRoomDto })
  async addClassroomStudent(
    @Param('yearId') yearOfStudyId: string,
    @Param('classId') classroomId: string,
    @Param('studentId') studentId: string,
  ): Promise<Classroom> {
    const result = await this.classroomService.addClassroomStudent({
      yearOfStudyId,
      classroomId,
      studentId,
    });
    if (!result.success) throw result.httpException;
    return result.data;
  }
}
