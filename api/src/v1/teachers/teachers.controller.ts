import {
  BadRequestException,
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { Prisma, Teacher } from '@prisma/client';
import { FindOptions } from '@src/utils';
import { UpdateOptions } from '@src/utils/update-options';
import { TeacherDto } from './dto/teacher.dto';
import { TeachersService } from './teachers.service';

@Controller({ path: 'teachers', version: '1' })
export class TeachersController {
  constructor(private readonly teacherService: TeachersService) {}

  @Get('/:teacherId')
  async findUnique(@Param('teacherId') teacherId: string): Promise<Teacher> {
    const result = await this.teacherService.findUnique(teacherId);
    if (!result.success) throw result.httpException;
    return result.data;
  }

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
}
