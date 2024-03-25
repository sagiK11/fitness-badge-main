import { ApiProperty } from '@nestjs/swagger';
import { Student } from '@prisma/client';
import { IsString } from 'class-validator';

export class StudentDto implements Partial<Student> {
  @IsString()
  @ApiProperty()
  id: string;

  @IsString()
  @ApiProperty()
  firstName: string;

  @IsString()
  @ApiProperty()
  lastName: string;

  @IsString()
  @ApiProperty()
  phone: string;

  @IsString()
  @ApiProperty()
  schoolId: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
