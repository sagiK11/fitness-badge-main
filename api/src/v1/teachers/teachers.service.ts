import { Injectable } from '@nestjs/common';
import { PrismaService } from '@src/prisma/prisma.service';

@Injectable()
export class TeachersService {
  constructor(private readonly prisma: PrismaService) {}

  async getTeacherStudents(tid: string) {
    return await this.prisma.teacher.findUnique({
      where: { id: tid },
      include: {
        yearsOfStudy: true,
        classRooms: {
          include: {
            tests: {
              include: {
                student: true,
              },
            },
          },
        },
      },
    });
  }
}
