import { Injectable } from '@nestjs/common';
import { School, Teacher } from '@prisma/client';
import { PrismaService, ResultService } from '@src/libs/infrastructure';

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
      const resultData = await this.prisma.school.findUniqueOrThrow({
        where: {
          id,
        },
      });
      return this.resultService.handleSuccess<School>(resultData);
    } catch (e) {
      return this.resultService.handleError<School>(e);
    }
  }

  async getSchoolTeachers(id: string) {
    try {
      const resultData = await this.prisma.teacher.findMany({
        where: {
          schoolId: id,
        },
      });
      return this.resultService.handleSuccess<Teacher[]>(resultData);
    } catch (e) {
      return this.resultService.handleError<Teacher[]>(e);
    }
  }
}
