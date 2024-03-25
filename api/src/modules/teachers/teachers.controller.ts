import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { Teacher } from '@prisma/client';
import { UpdateOptions } from '@src/libs/utils/update-options';
import { TeacherDto } from './dto/teacher.dto';
import { TeachersService } from './teachers.service';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@src/libs/guards/auth.guard';

@ApiTags('teachers')
@Controller({ path: 'teachers', version: '1' })
@UseGuards(AuthGuard)
export class TeachersController {
  constructor(private readonly teacherService: TeachersService) {}

  @Get('/:email')
  async findUnique(@Param('email') email: string): Promise<Teacher> {
    const result = await this.teacherService.findUnique(email);
    if (!result.success) throw result.httpException;
    return result.data;
  }

  @Get()
  @ApiOkResponse({ type: TeacherDto, isArray: true })
  async findMany(): Promise<Teacher[]> {
    const result = await this.teacherService.findMany();
    if (!result.success) throw result.httpException;
    return result.data;
  }

  @Post()
  @ApiCreatedResponse({ type: TeacherDto })
  async createTeacher(@Body() data: TeacherDto): Promise<Teacher> {
    const result = await this.teacherService.createTeacher(data);
    if (!result.success) throw result.httpException;
    return result.data;
  }

  @Put('/:teacherId')
  async updateTeacher(
    @Param('teacherId') teacherId: string,
    @Body() data: TeacherDto,
  ): Promise<Teacher> {
    const updateOptions: UpdateOptions = {
      id: teacherId,
      data,
    };
    const result = await this.teacherService.updateTeacher(updateOptions);
    if (!result.success) throw result.httpException;
    return result.data;
  }
}
