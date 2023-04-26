import { Injectable } from '@nestjs/common';
import { Classroom, Student, Teacher } from '@prisma/client';
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

  async createStudentEnrollment(data: {
    classroomId: string;
    studentId: string;
    yearOfStudyId: string;
  }): Promise<Result<Classroom>> {
    const { classroomId, studentId, yearOfStudyId } = data;
    try {
      const resultData = await this.prisma.classroom.update({
        where: {
          id: classroomId,
        },
        data: {
          studentEnrollments: {
            create: {
              studentId,
              yearOfStudyId,
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
          teacherEnrollments: {
            some: { yearOfStudyId, teacherId },
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
          teacherEnrollments: {
            some: {
              teacherId,
              yearOfStudyId,
            },
          },
        },
        include: {
          studentEnrollments: {
            where: {
              yearOfStudyId,
            },
            include: {
              student: true,
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
  }): Promise<Result<Teacher>> {
    try {
      const resultData = await this.prisma.teacher.update({
        where: {
          id: teacherId,
        },
        data: {
          enrollments: {
            create: {
              yearOfStudyId,
              classroomId,
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
      const classroom = await this.prisma.classroom.findFirst({
        where: { id: classroomId },
      });

      const resultData = await this.prisma.student.findMany({
        where: {
          schoolId: classroom.schoolId,
          gender: classroom.gender,
          enrollments: {
            none: {
              yearOfStudyId,
              classroomId,
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
