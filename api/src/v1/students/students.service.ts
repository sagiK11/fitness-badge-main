import { Injectable } from '@nestjs/common';
import { Student } from '@prisma/client';
import { PrismaService } from '@src/prisma/prisma.service';
import { ResultService } from '@src/utils/result/result.service';
import { Result } from '@src/utils/result/result';

@Injectable()
export class StudentsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly resultService: ResultService<Student>,
  ) {}

  async findMany(
    findOptions: { schoolId?: string } = {},
  ): Promise<Result<Student[]>> {
    const { schoolId } = findOptions;
    try {
      const resultData = await this.prisma.student.findMany({
        where: {
          schoolId,
        },
      });
      return this.resultService.handleSuccess<Student[]>(resultData);
    } catch (e) {
      return this.resultService.handleError<Student[]>(e);
    }
  }

  async findClassroomStudent({
    yearOfStudyId,
    classroomId,
    studentId,
  }: {
    yearOfStudyId: string;
    classroomId: string;
    studentId: string;
  }): Promise<Result<Student>> {
    try {
      const resultData = await this.prisma.student.findFirstOrThrow({
        where: {
          id: studentId,
          AND: {
            yearsOfStudy: {
              some: {
                id: yearOfStudyId,
              },
            },
            classrooms: {
              some: {
                id: classroomId,
                yearsOfStudy: {
                  some: {
                    id: yearOfStudyId,
                  },
                },
              },
            },
          },
        },
        include: {
          tests: {
            where: {
              yearOfStudyId,
            },
            include: {
              category: true,
            },
          },
        },
      });
      return this.resultService.handleSuccess(resultData);
    } catch (e) {
      return this.resultService.handleError(e);
    }
  }
}
