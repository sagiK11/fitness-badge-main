import { ApiProperty, PickType } from '@nestjs/swagger';
import { Gender, Student, Test } from '@prisma/client';
import { IsNumber, IsString } from 'class-validator';

export class TestDto implements Partial<Test> {
  @ApiProperty()
  id: string;

  @IsString()
  @ApiProperty()
  grade: number;

  @IsNumber()
  @ApiProperty()
  score: number;

  @IsString()
  @ApiProperty()
  categoryId: string;

  @IsString()
  @ApiProperty()
  studentId: string;

  @IsString()
  @ApiProperty()
  yearOfStudyId: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}

export interface UpdateTestInput {
  id: Test['id'];
  score: Test['score'];
  categoryId: Test['categoryId'];
  gender: Student['gender'];
}

export class UpdateTestDto
  extends PickType(TestDto, ['score', 'categoryId', 'id'] as const)
  implements UpdateTestInput
{
  @IsString()
  @ApiProperty()
  gender: Gender;
}
