import { Body, Controller, Put } from '@nestjs/common';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { Test } from '@prisma/client';
import { TestsService } from './tests.service';
import { UpdateTestDto } from './dto/test.dto';

@ApiTags('tests')
@Controller({ path: 'tests', version: '1' })
export class TestsController {
  constructor(private readonly testService: TestsService) {}

  @Put()
  @ApiCreatedResponse({ type: UpdateTestDto, isArray: true })
  async updateTests(@Body() payload: UpdateTestDto[]): Promise<Test[]> {
    const result = await this.testService.updateTests(payload);
    if (!result.success) throw result.httpException;
    return result.data;
  }
}
