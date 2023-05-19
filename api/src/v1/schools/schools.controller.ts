import { Controller, Get, Param } from '@nestjs/common';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { SchoolsService } from './schools.service';
import { School } from '@prisma/client';
import { SchoolsModule } from './schools.module';

@ApiTags('schools')
@Controller({ path: 'schools', version: '1' })
export class SchoolsController {
  constructor(private readonly schoolService: SchoolsService) {}

  @Get()
  @ApiCreatedResponse({ type: SchoolsModule, isArray: true })
  async getAllSchools(): Promise<School[]> {
    const result = await this.schoolService.findMany();
    if (!result.success) throw result.httpException;
    return result.data;
  }
  @Get('/:id')
  @ApiCreatedResponse({ type: SchoolsModule })
  async getSchool(@Param('id') id: string): Promise<School> {
    const result = await this.schoolService.findOne(id);
    if (!result.success) throw result.httpException;
    return result.data;
  }
}
