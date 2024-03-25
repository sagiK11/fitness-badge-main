import { Injectable, UseGuards } from '@nestjs/common';
import { CategoryScoreResult, Gender, TestCategory } from '@prisma/client';
import { AuthGuard } from '@src/libs/guards/auth.guard';
import { PrismaService, ResultService, Result } from '@src/libs/infrastructure';
import { parse } from 'csv-parse/sync';

@Injectable()
@UseGuards(AuthGuard)
export class TestCategoriesService {
  private readonly LOWEST_GRADE = 30;

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

  async getGrade(
    score: number,
    gender: Gender,
    testCategoryId: string,
  ): Promise<number> {
    const isFemale = gender === Gender.FEMALE;
    const genderScoreColumn = isFemale ? 'femaleScore' : 'maleScore';
    const genderGradeColumn = isFemale ? 'femaleGrade' : 'maleGrade';
    const category = await this.prisma.testCategory.findUnique({
      where: { id: testCategoryId },
    });
    const operator = category.algoOperator;

    const resultData = await this.prisma.categoryScoreResult.findFirst({
      where: {
        testCategoryId,
        AND: {
          [genderScoreColumn]: {
            [operator]: score,
          },
        },
      },
    });
    return resultData ? resultData[genderGradeColumn] : this.LOWEST_GRADE;
  }

  async findCategoryScoreResultByAlias(
    alias: string,
  ): Promise<Result<CategoryScoreResult>> {
    try {
      const resultData = await this.prisma.categoryScoreResult.findFirst({
        where: {
          testCategory: {
            alias,
          },
        },
      });
      return this.resultService.handleSuccess<CategoryScoreResult>(resultData);
    } catch (e) {
      return this.resultService.handleError<CategoryScoreResult>(e);
    }
  }

  async findByAlias(alias: string): Promise<Result<TestCategory>> {
    try {
      const resultData = await this.prisma.testCategory.findFirst({
        where: {
          alias,
        },
      });
      return this.resultService.handleSuccess<TestCategory>(resultData);
    } catch (e) {
      return this.resultService.handleError<TestCategory>(e);
    }
  }
}
