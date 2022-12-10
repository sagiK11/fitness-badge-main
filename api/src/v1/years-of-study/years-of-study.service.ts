import { Injectable } from '@nestjs/common';
import { YearOfStudy } from '@prisma/client';
import { PrismaService } from '@src/prisma/prisma.service';

@Injectable()
export class YearsOfStudyService {
  constructor(private readonly prisma: PrismaService) {}

  async getCurrentYearOfStudy(): Promise<YearOfStudy> {
    const now = new Date();
    const result = await this.prisma.yearOfStudy.findFirst({
      where: {
        startDate: {
          lte: now,
        },
        endDate: {
          gte: now,
        },
      },
    });
    return result;
  }
}
