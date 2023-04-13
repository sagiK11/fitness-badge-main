import { Injectable } from '@nestjs/common';
import { CategoryScoreResult, TestCategory } from '@prisma/client';
import { PrismaService } from '@src/prisma/prisma.service';
import { Result } from '@src/utils/result/result';
import { ResultService } from '@src/utils/result/result.service';
import { parse } from 'csv-parse/sync';

@Injectable()
export class TestCategoriesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly resultService: ResultService<TestCategory>,
  ) {}

  async findMany(): Promise<Result<TestCategory[]>> {
    try {
      const resultData = await this.prisma.testCategory.findMany();
      return this.resultService.handleSuccess<TestCategory[]>(resultData);
    } catch (e) {
      return this.resultService.handleError<TestCategory[]>(e);
    }
  }

  async uploadGrades(
    testCategoryId: string,
    file: Express.Multer.File,
  ): Promise<Result<void>> {
    try {
      const records = parse(file.buffer, {
        columns: true,
        skip_empty_lines: true,
      });
      // clear what we have
      await this.prisma.categoryScoreResult.deleteMany();
      // create the right shape from file
      const cleaned = records?.map((entry: CategoryScoreResult) => {
        return {
          testCategoryId,
          maleScore: Number(entry.maleScore),
          maleGrade: Number(entry.maleScore),
          femaleScore: Number(entry.femaleScore),
          femaleGrade: Number(entry.femaleGrade),
        };
      });
      // push to db
      await this.prisma.categoryScoreResult.createMany({
        data: cleaned,
      });
      return this.resultService.handleSuccess<void>(null);
    } catch (e) {
      return this.resultService.handleError<void>(e);
    }
  }
}
