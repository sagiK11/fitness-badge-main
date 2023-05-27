import {
  Controller,
  Get,
  Param,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';

import { ClassroomsService } from './classrooms.service';
import { ApiOkResponse, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Classroom, Student } from '@prisma/client';
import { ClassRoomDto } from './dto/classroom.dto';
import { StudentDto } from '../students/dto/student.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('classrooms')
@Controller({ path: 'classrooms', version: '1' })
export class ClassroomsController {
  constructor(private readonly classroomsService: ClassroomsService) {}

  @Get()
  @ApiOkResponse({ type: ClassRoomDto, isArray: true })
  async findMany(): Promise<Classroom[]> {
    const result = await this.classroomsService.findMany();
    if (!result.success) throw result.httpException;
    return result.data;
  }

  @Get()
  @ApiOkResponse({ type: ClassRoomDto, isArray: true })
  @ApiQuery({ name: 'schoolId', required: true })
  async findManyBySchool(
    @Query('schoolId') schoolId: string,
  ): Promise<Classroom[]> {
    const result = await this.classroomsService.findManyBySchool({ schoolId });
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
    const result = await this.classroomsService.findAvailableStudents({
      yearOfStudyId,
      schoolId,
      classroomId,
    });
    if (!result.success) throw result.httpException;
    return result.data;
  }

  @Post('/upload-students')
  @ApiQuery({ name: 'classroomId', required: true })
  @ApiQuery({ name: 'yearOfStudyId', required: true })
  @ApiQuery({ name: 'schoolId', required: true })
  @UseInterceptors(FileInterceptor('file'))
  async uploadStudents(
    @UploadedFile() file: Express.Multer.File,
    @Query('classroomId') classroomId: string,
    @Query('yearOfStudyId') yearOfStudyId: string,
    @Query('schoolId') schoolId: string,
  ): Promise<void> {
    const result = await this.classroomsService.uploadStudents(
      { classroomId, schoolId, yearOfStudyId },
      file,
    );
    if (!result.success) throw result.httpException;
    return result.data;
  }
}
