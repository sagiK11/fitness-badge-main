import { Injectable } from '@nestjs/common';
import { School } from '@prisma/client';
import { PrismaService } from '@src/prisma/prisma.service';
import { ResultService } from '@src/utils/result/result.service';

@Injectable()
export class SchoolsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly resultService: ResultService<School>,
  ) {}

  async findMany() {
    try {
      const resultData = await this.prisma.school.findMany();
      return this.resultService.handleSuccess<School[]>(resultData);
    } catch (e) {
      return this.resultService.handleError<School[]>(e);
    }
  }
  async findOne(id: string) {
    try {
      const resultData = await this.prisma.school.findUnique({
        where: {
          id,
        },
      });
      return this.resultService.handleSuccess<School>(resultData);
    } catch (e) {
      return this.resultService.handleError<School>(e);
    }
  }
}
