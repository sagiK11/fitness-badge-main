import { Injectable, Post } from '@nestjs/common';
import { Classroom, Prisma } from '@prisma/client';
import { PrismaService } from '@src/prisma/prisma.service';
import { ResultService } from '@src/utils/result/result.service';
import { Result } from '@src/utils/result/result';

@Injectable()
export class ClassroomsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly resultService: ResultService<Classroom>,
  ) {}

  async findMany(): Promise<Result<Classroom[]>> {
    try {
      const resultData = await this.prisma.classroom.findMany();
      return this.resultService.handleSuccess(resultData);
    } catch (e) {
      return this.resultService.handleError(e);
    }
  }

  async findManyBySchool({
    schoolId,
  }: {
    schoolId: string;
  }): Promise<Result<Classroom[]>> {
    try {
      const resultData = await this.prisma.school.findUnique({
        where: {
          id: schoolId,
        },
        include: {
          classrooms: true,
        },
      });
      return this.resultService.handleSuccess(resultData.classrooms);
    } catch (e) {
      return this.resultService.handleError(e);
    }
  }

  async createClass(data: Prisma.ClassroomCreateManyInput[]) {
    try {
      const resultData = await this.prisma.classroom.createMany({
        data,
      });
      return this.resultService.handleSuccess(resultData);
    } catch (e) {
      return this.resultService.handleError(e);
    }
  }
}
