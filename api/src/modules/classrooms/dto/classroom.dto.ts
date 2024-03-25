import { ApiProperty } from '@nestjs/swagger';
import { Classroom, Gender } from '@prisma/client';
import { IsString } from 'class-validator';

export class ClassRoomDto implements Partial<Classroom> {
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
