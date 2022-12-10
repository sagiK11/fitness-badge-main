import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { Student } from '@prisma/client';
import { PrismaService } from '@src/prisma/prisma.service';

@Controller({ path: 'students', version: '1' })
export class StudentsController {
  constructor(private readonly prisma: PrismaService) {}

  // Find all teacher students
  @Get()
  async getTeacherStudents(@Param('tid') tid: string): Promise<any[]> {
    const res = await this.prisma.teacher.findUnique({
      where: {
        id: tid,
      },
    });
    return null;
  }

  // Create new student
  @Post()
  async createTeacherStudent(
    @Param('tid') tid: string,
    @Body() dto,
  ): Promise<Student> {
    return await this.prisma.student.create({
      data: {
        teacherId: tid,
        ...dto,
      },
    });
  }

  // Update new student
  @Put('/:sid')
  async updateTeacherStudent(
    @Param('sid') sid: string,
    @Body() dto,
  ): Promise<Student> {
    return await this.prisma.student.update({
      where: {
        id: sid,
      },
      data: {
        ...dto,
      },
    });
  }
}
