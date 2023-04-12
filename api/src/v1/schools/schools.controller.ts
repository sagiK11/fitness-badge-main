import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SchoolsService } from './schools.service';
import { School } from '@prisma/client';

@ApiTags('schools')
@Controller({ path: 'schools', version: '1' })
export class SchoolsController {
  constructor(private readonly schoolService: SchoolsService) {}

  @Get()
  async getAllSchools(): Promise<School[]> {
    const result = await this.schoolService.findMany();
    if (!result.success) throw result.httpException;
    return result.data;
  }
}
