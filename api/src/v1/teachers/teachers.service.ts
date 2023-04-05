import { Injectable } from '@nestjs/common';
import { Classroom, Prisma, Student, Teacher } from '@prisma/client';
import { PrismaService } from '@src/prisma/prisma.service';
import { Result } from '@src/utils/result/result';
import { ResultService } from '@src/utils/result/result.service';
import { UpdateOptions } from '@src/utils/update-options';
import { YearsOfStudyService } from '../years-of-study/years-of-study.service';
import { AddTeacherClassrooms } from '../classrooms/dto/classroom.dto';
import { FindOptions } from '@src/utils';

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
      return this.resultService.handleSuccess<Teacher[]>(resultData);
    } catch (e) {
      return this.resultService.handleError<Teacher[]>(e);
    }
  }

  async findUnique(email: string): Promise<Result<Teacher>> {
    try {
      const resultData = await this.prisma.teacher.findUniqueOrThrow({
        where: {
          email,
        },
        include: {
          yearsOfStudy: true,
        },
      });
      return this.resultService.handleSuccess(resultData);
    } catch (e) {
      return this.resultService.handleError(e);
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
      return this.resultService.handleSuccess(resultData);
    } catch (e) {
      return this.resultService.handleError(e);
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

      return this.resultService.handleSuccess(resultData);
    } catch (e) {
      return this.resultService.handleError(e);
    }
  }

  async findTeacherClassrooms(
    options: FindOptions,
  ): Promise<Result<Classroom[]>> {
    let { yearOfStudyId, id } = options;

    if (!yearOfStudyId) {
      const yearOfStudy = await this.yearOfStudyService.getCurrentYearOfStudy();
      yearOfStudyId = yearOfStudy.id;
    }

    try {
      const resultData = await this.prisma.classroom.findMany({
        where: {
          teacher: {
            some: {
              id,
            },
          },
          yearsOfStudy: {
            some: {
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

  async findTeacherClassroomStudents(options: any): Promise<Result<Student[]>> {
    let { yearOfStudyId, teacherId, classroomId } = options;

    if (!yearOfStudyId) {
      const yearOfStudy = await this.yearOfStudyService.getCurrentYearOfStudy();
      yearOfStudyId = yearOfStudy.id;
    }

    try {
      const resultData = await this.prisma.student.findMany({
        where: {
          classrooms: {
            some: {
              id: classroomId,
              AND: {
                teacher: {
                  some: {
                    id: teacherId,
                  },
                },
              },
            },
          },
          yearsOfStudy: {
            some: {
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

  async findTeacherClassroomStudent(options: any): Promise<Result<Student>> {
    let { yearOfStudyId, classroomId, studentId } = options;

    if (!yearOfStudyId) {
      const yearOfStudy = await this.yearOfStudyService.getCurrentYearOfStudy();
      yearOfStudyId = yearOfStudy.id;
    }

    try {
      const resultData = await this.prisma.student.findUnique({
        where: {
          id: studentId,
        },
        include: {
          tests: {
            include: {
              category: true,
            },
          },
          classrooms: {
            where: {
              id: classroomId,
              yearsOfStudy: {
                every: {
                  id: yearOfStudyId,
                },
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

  async addTeacherClassrooms(data: AddTeacherClassrooms) {
    try {
      const resultData = await this.prisma.classroom.update({
        where: {
          id: data.classroomId,
        },
        data: {
          teacher: {
            connect: {
              id: data.teacherId,
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
}
