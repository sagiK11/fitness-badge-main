import { ApiProperty } from '@nestjs/swagger';
import { ClassRoom, Gender } from '@prisma/client';
import { IsArray, IsString, ValidateNested } from 'class-validator';

export class CreateClassRoomDto implements Partial<ClassRoom> {
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

export interface AddTeacherClassRooms {
  classRooms: Pick<ClassRoom, 'id'>[];
}

export class AddTeacherClassRoomsDto implements AddTeacherClassRooms {
  @IsArray()
  @ApiProperty()
  @ValidateNested({ each: true })
  classRooms: Pick<ClassRoom, 'id'>[];
}
