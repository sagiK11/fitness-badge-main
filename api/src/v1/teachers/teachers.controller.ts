import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { Teacher } from '@prisma/client';
import { PrismaService } from '@src/prisma/prisma.service';
import { YearsOfStudyService } from '../years-of-study/years-of-study.service';
import { TeacherDto } from './dto/teacher.dto';
import { TeachersService } from './teachers.service';

@Controller({ path: 'teachers', version: '1' })
export class TeachersController {
  constructor(
    private readonly prisma: PrismaService,
    private readonly teacherService: TeachersService,
    private readonly yearOfStudyService: YearsOfStudyService,
  ) {}

  @Get()
  async getTeachers(): Promise<Teacher[]> {
    return await this.prisma.teacher.findMany();
  }

  @Post()
  async createTeacher(@Body() data: TeacherDto): Promise<Teacher> {
    const currentYearOfStudy =
      await this.yearOfStudyService.getCurrentYearOfStudy();
    console.log('ss', currentYearOfStudy);
    return await this.prisma.teacher.create({
      data: {
        ...data,
        yearsOfStudy: {
          create: {
            yearsOfStudy: {
              connect: {
                id: currentYearOfStudy.id,
              },
            },
          },
        },
      },
      include: {
        yearsOfStudy: true,
      },
    });
  }

  @Get('/:tid/students')
  async getTeachersStudents(@Param('tid') tid: string): Promise<any> {
    const result = await this.teacherService.getTeacherStudents(tid);
    if (!result) throw new NotFoundException();
    return result;
  }
}
