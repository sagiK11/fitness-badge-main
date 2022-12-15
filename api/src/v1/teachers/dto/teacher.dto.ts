import { ClassRoom } from '@prisma/client';
import { IsArray, IsEmail, IsString } from 'class-validator';

export class TeacherDto {
  @IsString()
  schoolId: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsEmail()
  email: string;

  @IsString()
  yearOfStudyId?: string;
}
