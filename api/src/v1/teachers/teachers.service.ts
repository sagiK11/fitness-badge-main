import { Injectable } from '@nestjs/common';
import { Prisma, Teacher } from '@prisma/client';
import { PrismaService } from '@src/prisma/prisma.service';
import { FindOptions } from '@src/utils';
import { Result } from '@src/utils/result/result';
import { ResultService } from '@src/utils/result/result.service';
import { UpdateOptions } from '@src/utils/update-options';
import { YearsOfStudyService } from '../years-of-study/years-of-study.service';
import { TeacherDto } from './dto/teacher.dto';

@Injectable()
export class TeachersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly yearOfStudyService: YearsOfStudyService,
    private readonly resultService: ResultService<Teacher>,
  ) {}

  async findMany(): Promise<Result<Teacher[]>> {
    try {
      const resultData = await this.prisma.teacher.findMany();
      return this.resultService.handle<Teacher[]>({
        data: resultData,
        success: true,
      });
    } catch (e) {
      return this.resultService.handleException<Teacher[]>(e);
    }
  }

  async findUnique(teacherId: string): Promise<Result<Teacher>> {
    try {
      const resultData = await this.prisma.teacher.findUnique({
        where: {
          id: teacherId,
        },
      });
      return this.resultService.handle({
        data: resultData,
        success: true,
      });
    } catch (e) {
      return this.resultService.handleException(e);
    }
  }

  async createTeacher(
    teacher: Prisma.TeacherUncheckedCreateInput,
  ): Promise<Result<Teacher>> {
    const yearOfStudy = await this.yearOfStudyService.getCurrentYearOfStudy();

    try {
      const resultData = await this.prisma.teacher.create({
        data: {
          ...teacher,
          yearsOfStudy: {
            connect: {
              id: yearOfStudy.id,
            },
          },
        },
        include: {
          yearsOfStudy: true,
        },
      });
      return this.resultService.handle({
        data: resultData,
        success: true,
      });
    } catch (e) {
      return this.resultService.handleException(e);
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

      return this.resultService.handle({
        data: resultData,
        success: true,
      });
    } catch (e) {
      return this.resultService.handleException(e);
    }
  }
}
