import { ApiProperty } from '@nestjs/swagger';
import { MeasureUnitEnum, TestCategory } from '@prisma/client';
import { IsEnum, IsString } from 'class-validator';

export class TestCategoryDto implements Partial<TestCategory> {
  @ApiProperty()
  id: string;

  @IsString()
  @ApiProperty()
  name: string;

  @IsString()
  @ApiProperty()
  alias: string;

  @IsEnum(MeasureUnitEnum)
  @ApiProperty()
  measureUnit: MeasureUnitEnum;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
