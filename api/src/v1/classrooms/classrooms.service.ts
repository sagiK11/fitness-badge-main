import { Injectable, Post } from '@nestjs/common';
import { Classroom, Prisma } from '@prisma/client';
import { PrismaService } from '@src/prisma/prisma.service';
import { ResultService } from '@src/utils/result/result.service';

@Injectable()
export class ClassroomsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly resultService: ResultService<Classroom>,
  ) {}

  @Post()
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
