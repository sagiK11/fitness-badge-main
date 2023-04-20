import { Injectable } from '@nestjs/common';
import { Classroom, Prisma, Student } from '@prisma/client';
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
      const resultData = await this.prisma.classroom.findMany({
        where: {
          schoolId,
        },
      });
      return this.resultService.handleSuccess(resultData);
    } catch (e) {
      return this.resultService.handleError(e);
    }
  }

  async addClassroomStudent(data: {
    classroomId: string;
    studentId: string;
    yearOfStudyId: string;
  }): Promise<Result<Classroom>> {
    try {
      const resultData = await this.prisma.classroom.update({
        where: {
          id: data.classroomId,
        },
        data: {
          students: {
            connect: { id: data.studentId },
            update: {
              where: {
                id: data.studentId,
              },
              data: { yearsOfStudy: { connect: { id: data.yearOfStudyId } } },
            },
          },
          yearsOfStudy: {
            connect: {
              id: data.yearOfStudyId,
            },
          },
        },
      });

      return this.resultService.handleSuccess(resultData);
    } catch (e) {
      return this.resultService.handleError(e);
    }
  }

  async findTeacherClassrooms({
    yearOfStudyId,
    teacherId,
  }: {
    yearOfStudyId: string;
    teacherId: string;
  }): Promise<Result<Classroom[]>> {
    try {
      const resultData = await this.prisma.classroom.findMany({
        where: {
          teacher: {
            some: {
              id: teacherId,
            },
          },
          AND: {
            yearsOfStudy: {
              some: {
                id: yearOfStudyId,
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

  async findTeacherClassroom({
    yearOfStudyId,
    teacherId,
    classroomId,
  }: {
    yearOfStudyId: string;
    teacherId: string;
    classroomId: string;
  }): Promise<Result<Classroom>> {
    try {
      const resultData = await this.prisma.classroom.findFirst({
        where: {
          id: classroomId,
          AND: {
            teacher: {
              some: {
                id: teacherId,
              },
            },
            yearsOfStudy: {
              some: {
                id: yearOfStudyId,
              },
            },
          },
        },
        include: {
          students: {
            where: {
              yearsOfStudy: {
                some: {
                  id: yearOfStudyId,
                },
              },
            },
          },
        },
      });
      return this.resultService.handleSuccess<Classroom>(resultData);
    } catch (e) {
      return this.resultService.handleError<Classroom>(e);
    }
  }

  async addTeacherClassroom({
    yearOfStudyId,
    teacherId,
    classroomId,
  }: {
    yearOfStudyId: string;
    teacherId: string;
    classroomId: string;
  }): Promise<Result<Classroom>> {
    try {
      const resultData = await this.prisma.classroom.update({
        where: {
          id: classroomId,
        },
        data: {
          teacher: {
            connect: {
              id: teacherId,
            },
          },
          yearsOfStudy: {
            connect: {
              id: yearOfStudyId,
            },
          },
        },
      });
      return this.resultService.handleSuccess(resultData);
    } catch (e) {
      return this.resultService.handleError(e);
    }
  }

  async findAvailableStudents(data: {
    yearOfStudyId: string;
    schoolId: string;
    classroomId: string;
  }): Promise<Result<Student[]>> {
    const { yearOfStudyId, schoolId, classroomId } = data;
    try {
      const resultData = await this.prisma.student.findMany({
        where: {
          schoolId,
          yearsOfStudy: {
            some: {
              id: yearOfStudyId,
            },
          },
          classrooms: {
            none: {
              id: classroomId,
            },
          },
        },
      });
      return this.resultService.handleSuccess<Student[]>(resultData);
    } catch (e) {
      return this.resultService.handleError<Student[]>(e);
    }
  }
}
