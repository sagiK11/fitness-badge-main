import { Injectable } from '@nestjs/common';
import { Prisma, Test } from '@prisma/client';
import { PrismaService } from '@src/prisma/prisma.service';
import { Result } from '@src/utils/result/result';
import { ResultService } from '@src/utils/result/result.service';

@Injectable()
export class TestsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly resultService: ResultService<Test>,
  ) {}

  async updateTests(tests: Prisma.TestUpdateInput[]): Promise<Result<Test[]>> {
    try {
      const resultData: Test[] = [];
      for (const test of tests) {
        const { id, ...data } = test;
        const result = await this.prisma.test.update({
          where: {
            id: id as string,
          },
          data,
        });
        resultData.push(result);
      }
      return this.resultService.handleSuccess(resultData);
    } catch (e) {
      return this.resultService.handleError(e);
    }
  }
}
