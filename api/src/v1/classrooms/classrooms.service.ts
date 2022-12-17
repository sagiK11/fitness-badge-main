import { Injectable, Post } from '@nestjs/common';
import { ClassRoom, Prisma } from '@prisma/client';
import { PrismaService } from '@src/prisma/prisma.service';
import { Result } from '@src/utils/result/result';
import { ResultService } from '@src/utils/result/result.service';
import { YearsOfStudyService } from '../years-of-study/years-of-study.service';

@Injectable()
export class ClassroomsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly resultService: ResultService<ClassRoom>,
  ) {}

  @Post()
  async createClass(data: Prisma.ClassRoomCreateManyInput[]) {
    try {
      const resultData = await this.prisma.classRoom.createMany({
        data,
      });
      return this.resultService.handleSuccess(resultData);
    } catch (e) {
      return this.resultService.handleError(e);
    }
  }
}
