import {
  Controller,
  Get,
  Param,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CategoryScoreResult, Gender, TestCategory } from '@prisma/client';
import { TestCategoriesService } from './test-categories.service';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('test-categories')
@Controller({ path: 'test-categories', version: '1' })
export class TestCategoriesController {
  constructor(private readonly testCategoryService: TestCategoriesService) {}

  @Get()
  async findMany(): Promise<TestCategory[]> {
    const result = await this.testCategoryService.findMany();
    if (!result.success) throw result.httpException;
    return result.data;
  }

  // used to e2e to test the "getGrade" method
  @Get('/score-result')
  async findCategoryScores(
    @Query('alias') alias: string,
    @Query('gender') gender: Gender,
    @Query('score') score: string,
  ): Promise<number> {
    const result = await this.testCategoryService.findCategoryByAlias(alias);
    return await this.testCategoryService.getGrade(
      parseFloat(score),
      gender,
      result.data.testCategoryId,
    );
  }

  @Post('/:testCategoryId/upload-grades')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Param('testCategoryId') testCategoryId: string,
  ): Promise<void> {
    const result = await this.testCategoryService.uploadGrades(
      testCategoryId,
      file,
    );
    if (!result.success) throw result.httpException;
    return result.data;
  }
}
