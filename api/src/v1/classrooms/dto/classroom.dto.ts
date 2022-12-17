import { ApiProperty } from '@nestjs/swagger';
import { Classroom, Gender } from '@prisma/client';
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
  classrooms: Pick<Classroom, 'id'>[];
}

export class AddTeacherClassroomsDto implements AddTeacherClassrooms {
  @IsArray()
  @ApiProperty()
  @ValidateNested({ each: true })
  classrooms: Pick<Classroom, 'id'>[];
}
