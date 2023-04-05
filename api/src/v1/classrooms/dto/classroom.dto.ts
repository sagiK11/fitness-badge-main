import { ApiProperty } from '@nestjs/swagger';
import { Classroom, Gender, Teacher, YearOfStudy } from '@prisma/client';
import { IsArray, IsString, ValidateNested } from 'class-validator';

export class CreateClassRoomDto implements Partial<Classroom> {
  @IsString()
  @ApiProperty()
  schoolId: string;

  @IsString()
  @ApiProperty()
  name: string;

  @IsString()
  @ApiProperty()
  gender: Gender;

  @IsString()
  @ApiProperty()
  yearOfStudyId?: string;
}

export interface AddTeacherClassrooms {
  teacherId: Teacher['id'];
  classroomId: Classroom['id'];
  yearOfStudyId: YearOfStudy['id'];
}

export class AddTeacherClassroomsDto implements AddTeacherClassrooms {
  @IsString()
  @ApiProperty()
  teacherId: Teacher['id'];

  @IsString()
  @ApiProperty()
  classroomId: Classroom['id'];

  @IsString()
  @ApiProperty()
  yearOfStudyId: YearOfStudy['id'];
}
