import { Injectable } from '@nestjs/common';
import { YearOfStudy } from '@prisma/client';
import { PrismaService, ResultService, Result } from '@src/libs/infrastructure';

@Injectable()
export class YearsOfStudyService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly resultService: ResultService<YearOfStudy>,
  ) {}

  async findMany(): Promise<Result<YearOfStudy[]>> {
    try {
      const resultData = await this.prisma.yearOfStudy.findMany({});
      return this.resultService.handleSuccess<YearOfStudy[]>(resultData);
    } catch (e) {
      return this.resultService.handleError<YearOfStudy[]>(e);
    }
  }
}
