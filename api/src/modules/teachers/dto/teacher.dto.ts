import { ApiProperty } from '@nestjs/swagger';
import { Teacher } from '@prisma/client';
import { IsEmail, IsOptional, IsString } from 'class-validator';

export class TeacherDto implements Partial<Teacher> {
  @ApiProperty()
  id: string;

  @IsString()
  @ApiProperty()
  schoolId: string;

  @IsString()
  @ApiProperty()
  firstName: string;

  @IsString()
  @ApiProperty()
  lastName: string;

  @IsEmail()
  @ApiProperty()
  email: string;

  @IsString()
  @ApiProperty()
  @IsOptional()
  yearOfStudyId?: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
