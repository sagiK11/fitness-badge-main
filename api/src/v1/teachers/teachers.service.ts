import { Injectable } from '@nestjs/common';
import { Prisma, Teacher, YearOfStudy } from '@prisma/client';
import { PrismaService } from '@src/prisma/prisma.service';
import { Result } from '@src/utils/result/result';
import { ResultService } from '@src/utils/result/result.service';
import { UpdateOptions } from '@src/utils/update-options';

@Injectable()
export class TeachersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly resultService: ResultService<Teacher>,
  ) {}

  async findMany(): Promise<Result<Teacher[]>> {
    try {
      const resultData = await this.prisma.teacher.findMany();
      return this.resultService.handleSuccess<Teacher[]>(resultData);
    } catch (e) {
      return this.resultService.handleError<Teacher[]>(e);
    }
  }

  async findUnique(email: string): Promise<Result<Teacher>> {
    try {
      const resultData = await this.prisma.teacher.findUniqueOrThrow({
        where: {
          email,
        },
        include: {
          enrollments: {
            include: {
              yearOfStudy: true,
            },
          },
          school: true,
        },
      });
      return this.resultService.handleSuccess(resultData);
    } catch (e) {
      return this.resultService.handleError(e);
    }
  }

  async createTeacher(
    teacher: Prisma.TeacherUncheckedCreateInput,
  ): Promise<Result<Teacher>> {
    try {
      const resultData = await this.prisma.teacher.create({
        data: {
          ...teacher,
        },
        include: {
          enrollments: true,
        },
      });
      return this.resultService.handleSuccess(resultData);
    } catch (e) {
      return this.resultService.handleError(e);
    }
  }

  async updateTeacher(options: UpdateOptions): Promise<Result<Teacher>> {
    const { id, data } = options;
    try {
      const resultData = await this.prisma.teacher.update({
        where: {
          id,
        },
        data,
      });

      return this.resultService.handleSuccess(resultData);
    } catch (e) {
      return this.resultService.handleError(e);
    }
  }

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
