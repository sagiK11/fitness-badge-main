import { Controller, Get, Param, Put, Query, UseGuards } from '@nestjs/common';

import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';

import { ClassroomsService } from '../classrooms/classrooms.service';
import { StudentsService } from '../students/students.service';
import {
  Classroom,
  Student,
  Teacher,
  TestCategory,
  YearOfStudy,
} from '@prisma/client';
import { StudentDto } from '../students/dto/student.dto';
import { ClassRoomDto } from '../classrooms/dto/classroom.dto';
import { TestDto } from '../tests/dto/test.dto';
import { YearsOfStudyService } from './years-of-study.service';
import { AuthGuard } from '@src/guards/auth.guard';

@ApiTags('years-of-study')
@Controller({ path: 'years-of-study', version: '1' })
@UseGuards(AuthGuard)
export class YearsOfStudyController {
  constructor(
    private readonly classroomService: ClassroomsService,
    private readonly studentService: StudentsService,
    private readonly yearOfStudyService: YearsOfStudyService,
  ) {}

  @Get()
  async findMany(): Promise<YearOfStudy[]> {
    const result = await this.yearOfStudyService.findMany();
    if (!result.success) throw result.httpException;
    return result.data;
  }

  @Get('/:yearId/teachers/:teacherId/classrooms')
  @ApiParam({ name: 'yearId', required: true })
  @ApiParam({ name: 'teacherId', required: true })
  @ApiOkResponse({ type: ClassRoomDto, isArray: true }) //change this
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
  async createTeacherEnrollment(
    @Param('yearId') yearOfStudyId: string,
    @Param('teacherId') teacherId: string,
    @Param('classId') classroomId: string,
  ): Promise<Teacher> {
    const result = await this.classroomService.createTeacherEnrollment({
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
  @ApiOkResponse({ type: ClassRoomDto })
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
  @ApiOkResponse({ type: StudentDto })
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

  @Get('/:yearId/classrooms/:classId/available-students')
  @ApiParam({ name: 'yearId', required: true })
  @ApiParam({ name: 'classId', required: true })
  @ApiQuery({ name: 'schoolId', required: true })
  @ApiOkResponse({ type: StudentDto })
  async findAvailableStudents(
    @Param('yearId') yearOfStudyId: string,
    @Param('classId') classroomId: string,
    @Query('schoolId') schoolId: string,
  ): Promise<Student[]> {
    const result = await this.classroomService.findAvailableStudents({
      yearOfStudyId,
      classroomId,
      schoolId,
    });
    if (!result.success) throw result.httpException;
    return result.data;
  }

  @Put('/:yearId/classrooms/:classId/students/:studentId')
  @ApiParam({ name: 'yearId', required: true })
  @ApiParam({ name: 'classId', required: true })
  @ApiParam({ name: 'studentId', required: true })
  @ApiCreatedResponse({ type: ClassRoomDto })
  async createStudentEnrollment(
    @Param('yearId') yearOfStudyId: string,
    @Param('classId') classroomId: string,
    @Param('studentId') studentId: string,
  ): Promise<Classroom> {
    const result = await this.classroomService.createStudentEnrollment({
      yearOfStudyId,
      classroomId,
      studentId,
    });
    if (!result.success) throw result.httpException;
    return result.data;
  }

  @Get('/:yearId/classrooms/:classId/students/:studentId/available-tests')
  @ApiOkResponse({ type: TestDto })
  @ApiParam({ name: 'yearId', required: true })
  @ApiParam({ name: 'studentId', required: true })
  async findStudentAvailableTests(
    @Param('yearId') yearOfStudyId: string,
    @Param('studentId') studentId: string,
    @Param('classId') classroomId: string,
  ): Promise<TestCategory[]> {
    const result = await this.studentService.findStudentAvailableTests({
      yearOfStudyId,
      studentId,
      classroomId,
    });
    if (!result.success) throw result.httpException;
    return result.data;
  }

  @Put(
    `/:yearId/classrooms/:classId/students/:studentId/test-category/:testCategoryId`,
  )
  @ApiCreatedResponse({ type: StudentDto })
  @ApiParam({ name: 'yearId', required: true })
  @ApiParam({ name: 'classId', required: true })
  @ApiParam({ name: 'studentId', required: true })
  @ApiParam({ name: 'testCategoryId', required: true })
  async addStudentTest(
    @Param('yearId') yearOfStudyId: string,
    @Param('classId') classroomId: string,
    @Param('studentId') studentId: string,
    @Param('testCategoryId') testCategoryId: string,
  ): Promise<Student> {
    const result = await this.studentService.addStudentTest({
      yearOfStudyId,
      studentId,
      classroomId,
      testCategoryId,
    });
    if (!result.success) throw result.httpException;
    return result.data;
  }
}
