import { Injectable } from '@nestjs/common';
import { Classroom, Student, Teacher } from '@prisma/client';
import { PrismaService } from '@src/prisma/prisma.service';
import { ResultService } from '@src/utils/result/result.service';
import { Result } from '@src/utils/result/result';
import { bufferToCsv, parseCsv } from '@src/utils';

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

  async findManyBySchool(data: {
    schoolId: string;
  }): Promise<Result<Classroom[]>> {
    const { schoolId } = data;
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

  async findTeacherClassrooms(data: {
    yearOfStudyId: string;
    teacherId: string;
  }): Promise<Result<Classroom[]>> {
    const { yearOfStudyId, teacherId } = data;
    try {
      const resultData = await this.prisma.classroom.findMany({
        where: {
          teacherEnrollments: {
            some: { yearOfStudyId, teacherId },
          },
        },
        orderBy: {
          name: 'asc',
        },
      });

      return this.resultService.handleSuccess(resultData);
    } catch (e) {
      return this.resultService.handleError(e);
    }
  }

  async findTeacherClassroom(data: {
    yearOfStudyId: string;
    teacherId: string;
    classroomId: string;
  }): Promise<Result<Classroom>> {
    const { yearOfStudyId, teacherId, classroomId } = data;
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
            orderBy: {
              student: {
                firstName: 'asc',
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

  async createTeacherEnrollment(data: {
    yearOfStudyId: string;
    teacherId: string;
    classroomId: string;
  }): Promise<Result<Teacher>> {
    const { yearOfStudyId, teacherId, classroomId } = data;
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

  async uploadStudents(
    params: { classroomId: string; yearOfStudyId: string; schoolId: string },
    file: Express.Multer.File,
  ): Promise<Result<Student[]>> {
    try {
      if (file.mimetype !== 'text/csv') {
        throw new Error('Invalid file format');
      }

      const csvData = bufferToCsv(file.buffer);
      const records: Student[] = parseCsv(csvData);

      const { classroomId, yearOfStudyId, schoolId } = params;
      const classroom = await this.prisma.classroom.findFirstOrThrow({
        where: { id: classroomId },
      });

      // cant use createMany with relation -.^
      const students: Student[] = [];
      for (const record of records) {
        const student = await this.prisma.student.create({
          data: {
            firstName: record.firstName,
            lastName: record.lastName,
            phone: record.phone,
            gender: classroom.gender,
            schoolId,
            enrollments: {
              create: {
                classroomId,
                yearOfStudyId,
              },
            },
          },
        });
        students.push(student);
      }
      return this.resultService.handleSuccess<Student[]>(students);
    } catch (e) {
      return this.resultService.handleError<Student[]>(e);
    }
  }
}
