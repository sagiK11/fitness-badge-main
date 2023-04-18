import { ApiProperty } from '@nestjs/swagger';
import { School } from '@prisma/client';
import { IsString } from 'class-validator';

export class SchoolDto implements School {
  @ApiProperty()
  id: string;

  @IsString()
  @ApiProperty()
  name: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
