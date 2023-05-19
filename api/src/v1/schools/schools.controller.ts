import { Controller, Get, Param } from '@nestjs/common';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { SchoolsService } from './schools.service';
import { School, Teacher } from '@prisma/client';
import { SchoolDto } from './dto/school.dto';
import { TeacherDto } from '../teachers/dto/teacher.dto';

@ApiTags('schools')
@Controller({ path: 'schools', version: '1' })
export class SchoolsController {
  constructor(private readonly schoolService: SchoolsService) {}

  @Get()
  @ApiCreatedResponse({ type: SchoolDto, isArray: true })
  async getAllSchools(): Promise<School[]> {
    const result = await this.schoolService.findMany();
    if (!result.success) throw result.httpException;
    return result.data;
  }

  @Get('/:id')
  @ApiCreatedResponse({ type: SchoolDto })
  async getSchool(@Param('id') id: string): Promise<School> {
    const result = await this.schoolService.findOne(id);
    if (!result.success) throw result.httpException;
    return result.data;
  }

  @Get('/:id/teachers')
  @ApiCreatedResponse({ type: TeacherDto, isArray: true })
  async getSchoolTeachers(@Param('id') id: string): Promise<Teacher[]> {
    const result = await this.schoolService.getSchoolTeachers(id);
    if (!result.success) throw result.httpException;
    return result.data;
  }
}
