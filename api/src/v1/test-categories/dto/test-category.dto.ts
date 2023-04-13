import { ApiProperty } from '@nestjs/swagger';
import { MeasureUnitEnum, TestCategory } from '@prisma/client';
import { IsEnum, IsString } from 'class-validator';

export class TestCategoryDto implements TestCategory {
  @ApiProperty()
  id: string;

  @IsString()
  @ApiProperty()
  name: string;

  @IsEnum(MeasureUnitEnum)
  @ApiProperty()
  measureUnit: MeasureUnitEnum;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
