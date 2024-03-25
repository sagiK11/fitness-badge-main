import { ApiProperty } from '@nestjs/swagger';
import { Admin } from '@prisma/client';

export class AdminDto implements Admin {
  @ApiProperty()
  id: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
