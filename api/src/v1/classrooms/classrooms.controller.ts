import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';

import { ClassroomsService } from './classrooms.service';
import { ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('classrooms')
@Controller({ path: 'classrooms', version: '1' })
export class ClassroomsController {
  constructor(private readonly classRoomsService: ClassroomsService) {}
}
