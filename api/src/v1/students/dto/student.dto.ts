import { IsEmail, IsPhoneNumber, IsString } from 'class-validator';

export class StudentDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsPhoneNumber()
  phone?: string;
}
