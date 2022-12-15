import { IsEmail, IsString } from 'class-validator';

export class ClassRoomDto {
  @IsString()
  schoolId: string;

  @IsString()
  name: string;

  @IsString()
  gender: string;

  @IsString()
  yearOfStudyId?: string;
}
