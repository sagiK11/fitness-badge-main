import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';

import { ClassroomsService } from './classrooms.service';
import { ApiOkResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Classroom } from '@prisma/client';
import { CreateClassRoomDto } from './dto/classroom.dto';

@ApiTags('classrooms')
@Controller({ path: 'classrooms', version: '1' })
export class ClassroomsController {
  constructor(private readonly classRoomsService: ClassroomsService) {}

  @Get()
  @ApiOkResponse({ type: CreateClassRoomDto, isArray: true })
  async findMany(): Promise<Classroom[]> {
    const result = await this.classRoomsService.findMany();
    if (!result.success) throw result.httpException;
    return result.data;
  }

  @Get('/:schoolId')
  @ApiOkResponse({ type: CreateClassRoomDto, isArray: true })
  async findManyBySchool(
    @Param('schoolId') schoolId: string,
  ): Promise<Classroom[]> {
    const result = await this.classRoomsService.findManyBySchool({ schoolId });
    if (!result.success) throw result.httpException;
    return result.data;
  }
}
