import { Controller, Get, Param, Query } from '@nestjs/common';
import { Teacher } from '@prisma/client';
import { FindOptions } from '@src/utils';
import { ClassroomsService } from './classrooms.service';

@Controller({ path: 'teachers/:teacherId/classrooms', version: '1' })
export class ClassroomsController {
  constructor(private readonly classRoomsService: ClassroomsService) {}

  @Get()
  async findTeacherClassRooms(
    @Param('teacherId') teacherId: string,
    @Query('yosId') yosId: string,
  ): Promise<Teacher> {
    const findOptions: FindOptions = {
      id: teacherId,
      yearOfStudyId: yosId,
    };
    const result = await this.classRoomsService.findTeacherClassRooms(
      findOptions,
    );
    if (!result.success) throw result.httpException;
    return result.data;
  }
}
