import { Injectable } from '@nestjs/common';
import { Prisma, Student, TestCategory } from '@prisma/client';
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

  async update(
    studentId: string,
    data: Prisma.StudentUpdateInput,
  ): Promise<Result<Student>> {
    try {
      const resultData = await this.prisma.student.update({
        where: {
          id: studentId,
        },
        data,
      });
      return this.resultService.handleSuccess<Student>(resultData);
    } catch (e) {
      return this.resultService.handleError<Student>(e);
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
            enrollments: {
              some: {
                classroomId,
                AND: {
                  yearOfStudyId,
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
            orderBy: {
              category: {
                name: 'asc',
              },
            },
          },
        },
      });
      return this.resultService.handleSuccess(resultData);
    } catch (e) {
      return this.resultService.handleError(e);
    }
  }

  async findStudentAvailableTests(data: {
    yearOfStudyId: string;
    studentId: string;
  }): Promise<Result<TestCategory[]>> {
    const { studentId, yearOfStudyId } = data;
    try {
      const tests = await this.prisma.test.findMany({
        where: {
          studentId: {
            equals: studentId,
          },
          yearOfStudyId: {
            equals: yearOfStudyId,
          },
        },
      });

      const resultData = await this.prisma.testCategory.findMany({
        where: {
          id: {
            notIn: tests.map((t) => t.categoryId),
          },
        },
      });
      return this.resultService.handleSuccess<TestCategory[]>(resultData);
    } catch (e) {
      return this.resultService.handleError<TestCategory[]>(e);
    }
  }

  async addStudentTest(data: {
    yearOfStudyId: string;
    studentId: string;
    testCategoryId: string;
  }): Promise<Result<Student>> {
    const { studentId, yearOfStudyId, testCategoryId } = data;
    try {
      const resultData = await this.prisma.student.update({
        where: {
          id: studentId,
        },
        data: {
          tests: {
            create: [
              {
                yearsOfStudy: {
                  connect: {
                    id: yearOfStudyId,
                  },
                },
                category: {
                  connect: {
                    id: testCategoryId,
                  },
                },
                score: 0,
                grade: 0,
              },
            ],
          },
        },
      });
      return this.resultService.handleSuccess<Student>(resultData);
    } catch (e) {
      return this.resultService.handleError<Student>(e);
    }
  }
}
