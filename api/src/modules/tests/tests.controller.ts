import {
  Body,
  Controller,
  Delete,
  Param,
  Put,
  UseGuards,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Test } from '@prisma/client';
import { TestsService } from './tests.service';
import { TestDto, UpdateTestDto } from './dto/test.dto';
import { AuthGuard } from '@src/libs/guards/auth.guard';

@ApiTags('tests')
@Controller({ path: 'tests', version: '1' })
@UseGuards(AuthGuard)
export class TestsController {
  constructor(private readonly testService: TestsService) {}

  @Put()
  @ApiCreatedResponse({ type: UpdateTestDto, isArray: true })
  async updateTests(@Body() payload: UpdateTestDto[]): Promise<Test[]> {
    const result = await this.testService.updateTests(payload);
    if (!result.success) throw result.httpException;
    return result.data;
  }

  @Put('/:testId')
  @ApiCreatedResponse({ type: UpdateTestDto })
  @ApiParam({ name: 'testId', required: true })
  async updateTest(@Body() payload: UpdateTestDto): Promise<Test> {
    const result = await this.testService.updateTest(payload);
    if (!result.success) throw result.httpException;
    return result.data;
  }

  @Delete('/:testId')
  @ApiResponse({ type: TestDto })
  @ApiParam({ name: 'testId', required: true })
  async removeTest(@Param('testId') testId: string): Promise<Test> {
    const result = await this.testService.removeTest(testId);
    if (!result.success) throw result.httpException;
    return result.data;
  }
}
