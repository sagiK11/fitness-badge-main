import { Injectable } from '@nestjs/common';
import { PrismaService } from '@src/prisma/prisma.service';
import { Student } from '@prisma/client';

@Injectable()
export class StudentsService {
  constructor(private readonly prisma: PrismaService) {}

  create(data: any): Promise<Student> {
    return this.prisma.student.create({ data });
  }

  findAll(): Promise<Student[]> {
    return this.prisma.student.findMany();
  }

  findOne(sid: string): Promise<Student> {
    return this.prisma.student.findUnique({ where: { id: sid } });
  }

  update(sid: string, data: any): Promise<Student> {
    return this.prisma.student.update({ where: { id: sid }, data });
  }

  delete(sid: string): Promise<Student> {
    return this.prisma.student.delete({ where: { id: sid } });
  }
}
