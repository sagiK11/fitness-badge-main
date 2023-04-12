import { ApiProperty, PickType } from '@nestjs/swagger';
import { Test } from '@prisma/client';
import { IsString } from 'class-validator';

export class TestDto implements Partial<Test> {
  @ApiProperty()
  id: string;

  @IsString()
  @ApiProperty()
  grade: number;

  @IsString()
  @ApiProperty()
  score: string;

  @IsString()
  @ApiProperty()
  categoryId: string;

  @IsString()
  @ApiProperty()
  yearOfStudyId: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
export class UpdateTestDto extends PickType(TestDto, [
  'score',
  'id',
] as const) {}
