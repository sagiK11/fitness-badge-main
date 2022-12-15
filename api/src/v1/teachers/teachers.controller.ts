import {
  BadRequestException,
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { Teacher } from '@prisma/client';
import { TeacherDto } from './dto/teacher.dto';
import { TeachersService } from './teachers.service';

@Controller({ path: 'teachers', version: '1' })
export class TeachersController {
  constructor(private readonly teacherService: TeachersService) {}

  @Get()
  async findMany(): Promise<Teacher[]> {
    const result = await this.teacherService.findMany();
    if (!result.success) throw result.httpException;
    return result.data;
  }

  @Post()
  async createTeacher(@Body() data: TeacherDto): Promise<Teacher> {
    const result = await this.teacherService.createTeacher(data);
    if (!result.success) throw result.httpException;
    return result.data;
  }

  @Get('/:tid/classrooms')
  async findTeacherClassRooms(
    @Param('tid') tid: string,
    @Query('yosId') yosId: string,
  ): Promise<Teacher> {
    const result = await this.teacherService.findTeacherClassRooms(tid, {
      yearOfStudyId: yosId,
    });
    if (!result.success) throw result.httpException;
    return result.data;
  }
}
