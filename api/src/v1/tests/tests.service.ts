import { Injectable } from '@nestjs/common';
import { Gender, Prisma, Test } from '@prisma/client';
import { PrismaService } from '@src/prisma/prisma.service';
import { Result } from '@src/utils/result/result';
import { ResultService } from '@src/utils/result/result.service';
import { TestCategoriesService } from '@src/v1/test-categories/test-categories.service';
import { UpdateTestInput } from './dto/test.dto';

@Injectable()
export class TestsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly testCategoriesService: TestCategoriesService,
    private readonly resultService: ResultService<Test>,
  ) {}

  async updateTests(testsData: UpdateTestInput[]): Promise<Result<Test[]>> {
    try {
      const resultData: Test[] = [];
      for (const testData of testsData) {
        const result = await this.updateTest(testData);
        resultData.push(result.data);
      }
      return this.resultService.handleSuccess(resultData);
    } catch (e) {
      return this.resultService.handleError(e);
    }
  }

  async updateTest(testData: UpdateTestInput): Promise<Result<Test>> {
    try {
      const { id, gender, categoryId, score } = testData;

      const grade = await this.testCategoriesService.getGrade(
        score,
        gender,
        categoryId,
      );

      const resultData = await this.prisma.test.update({
        where: {
          id: id as string,
        },
        data: {
          score,
          grade,
        },
      });
      return this.resultService.handleSuccess(resultData);
    } catch (e) {
      return this.resultService.handleError(e);
    }
  }
}
