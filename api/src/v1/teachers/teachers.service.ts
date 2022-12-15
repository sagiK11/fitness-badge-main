import { Injectable } from '@nestjs/common';
import { Prisma, Teacher } from '@prisma/client';
import { PrismaService } from '@src/prisma/prisma.service';
import { FindOptions } from '@src/utils';
import { Result } from '@src/utils/result/result';
import { ResultService } from '@src/utils/result/result.service';
import { YearsOfStudyService } from '../years-of-study/years-of-study.service';

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
      return this.resultService.handle<Teacher>({
        data: resultData,
        success: true,
      });
    } catch (e) {
      return this.resultService.handleException<Teacher>(e);
    }
  }

  async findTeacherClassRooms(
    tid: string,
    options?: FindOptions,
  ): Promise<Result<Teacher>> {
    let yearOfStudyId = options?.yearOfStudyId;
    if (!yearOfStudyId) {
      const yearOfStudy = await this.yearOfStudyService.getCurrentYearOfStudy();
      yearOfStudyId = yearOfStudy.id;
    }

    try {
      const resultData = await this.prisma.teacher.findUniqueOrThrow({
        where: {
          id: tid,
        },
        include: {
          classRooms: {
            include: {
              students: true,
            },
            where: {
              yearsOfStudy: {
                every: {
                  id: yearOfStudyId,
                },
              },
            },
          },
        },
      });
      return this.resultService.handle<Teacher>({
        data: resultData,
        success: true,
      });
    } catch (e) {
      return this.resultService.handleException<Teacher>(e);
    }
  }
}
