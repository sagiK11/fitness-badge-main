import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { Classroom, Prisma, Teacher } from '@prisma/client';
import { UpdateOptions } from '@src/utils/update-options';
import { TeacherDto } from './dto/teacher.dto';
import { TeachersService } from './teachers.service';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { AddTeacherClassroomsDto } from '../classrooms/dto/classroom.dto';
import { FindOptions } from '@src/utils';

@ApiTags('teachers')
@Controller({ path: 'teachers', version: '1' })
export class TeachersController {
  constructor(private readonly teacherService: TeachersService) {}

  @Get('/:email')
  async findUnique(@Param('email') email: string): Promise<Teacher> {
    const result = await this.teacherService.findUnique(email);
    if (!result.success) throw result.httpException;
    return result.data;
  }

  @Get()
  @ApiOkResponse({ type: TeacherDto, isArray: true })
  async findMany(): Promise<Teacher[]> {
    const result = await this.teacherService.findMany();
    if (!result.success) throw result.httpException;
    return result.data;
  }

  @Post()
  @ApiCreatedResponse({ type: TeacherDto })
  async createTeacher(@Body() data: TeacherDto): Promise<Teacher> {
    const result = await this.teacherService.createTeacher(data);
    if (!result.success) throw result.httpException;
    return result.data;
  }

  @Put('/:teacherId')
  async addTeacherClassRoom(
    @Param('teacherId') teacherId: string,
    @Body() data: TeacherDto,
  ): Promise<Teacher> {
    const updateOptions: UpdateOptions = {
      id: teacherId,
      data,
    };
    const result = await this.teacherService.updateTeacher(updateOptions);
    if (!result.success) throw result.httpException;
    return result.data;
  }

  @Get('/:teacherId/classrooms')
  @ApiQuery({ name: 'yosId', required: false })
  async findTeacherClassRooms(
    @Param('teacherId') teacherId: string,
    @Query('yosId')
    yosId?: string,
  ): Promise<Classroom[]> {
    const findOptions: FindOptions = {
      id: teacherId,
      yearOfStudyId: yosId,
    };
    const result = await this.teacherService.findTeacherClassrooms(findOptions);
    if (!result.success) throw result.httpException;
    return result.data;
  }

  @Put('/:teacherId/classrooms')
  async addTeacherClassrooms(
    @Param('teacherId') teacherId: string,
    @Body() data: AddTeacherClassroomsDto,
  ) {
    const result = await this.teacherService.addTeacherClassrooms(
      teacherId,
      data,
    );
    if (!result.success) throw result.httpException;
    return result.data;
  }
}
