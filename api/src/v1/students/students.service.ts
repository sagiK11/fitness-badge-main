import { Injectable } from '@nestjs/common';
import { Prisma, Student, TestCategory } from '@prisma/client';
import { PrismaService } from '@src/prisma/prisma.service';
import { ResultService } from '@src/utils/result/result.service';
import { Result } from '@src/utils/result/result';
import { TestCategoriesService } from '../test-categories/test-categories.service';

@Injectable()
export class StudentsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly testCategoriesService: TestCategoriesService,
    private readonly resultService: ResultService<Student>,
  ) {}

  async findMany(data: { schoolId: string }): Promise<Result<Student[]>> {
    const { schoolId } = data;
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

  async findClassroomStudent(data: {
    yearOfStudyId: string;
    classroomId: string;
    studentId: string;
  }): Promise<Result<Student>> {
    const { yearOfStudyId, classroomId, studentId } = data;
    try {
      const resultData = await this.prisma.student.findFirstOrThrow({
        where: {
          id: studentId,
          enrollments: {
            some: {
              classroomId,
              yearOfStudyId,
            },
          },
        },
        include: {
          tests: {
            where: {
              classroomId,
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
    classroomId: string;
  }): Promise<Result<Student>> {
    const { studentId, yearOfStudyId, testCategoryId, classroomId } = data;
    try {
      const resultData = await this.prisma.student.update({
        where: {
          id: studentId,
        },
        data: {
          tests: {
            create: [
              {
                classroom: {
                  connect: {
                    id: classroomId,
                  },
                },
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

  public async addStudentTestByAlias(
    testCategoryAlias: string,
    data: {
      yearOfStudyId: string;
      studentId: string;
      classroomId: string;
    },
  ) {
    const category = await this.testCategoriesService.findByAlias(
      testCategoryAlias,
    );

    return await this.addStudentTest({
      ...data,
      testCategoryId: category.data.id,
    });
  }
}
