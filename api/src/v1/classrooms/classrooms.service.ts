import { Injectable } from '@nestjs/common';
import { Teacher } from '@prisma/client';
import { PrismaService } from '@src/prisma/prisma.service';
import { FindOptions } from '@src/utils';
import { Result } from '@src/utils/result/result';
import { ResultService } from '@src/utils/result/result.service';
import { YearsOfStudyService } from '../years-of-study/years-of-study.service';

@Injectable()
export class ClassroomsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly yearOfStudyService: YearsOfStudyService,
    private readonly resultService: ResultService<Teacher>,
  ) {}

  async findTeacherClassRooms(options: FindOptions): Promise<Result<Teacher>> {
    let { yearOfStudyId, id } = options;

    if (!yearOfStudyId) {
      const yearOfStudy = await this.yearOfStudyService.getCurrentYearOfStudy();
      yearOfStudyId = yearOfStudy.id;
    }

    try {
      const resultData = await this.prisma.teacher.findUniqueOrThrow({
        where: {
          id,
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
      return this.resultService.handle({
        data: resultData,
        success: true,
      });
    } catch (e) {
      return this.resultService.handleException(e);
    }
  }
}
