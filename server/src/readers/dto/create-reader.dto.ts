import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateReaderDto {
  @IsString()
  @IsNotEmpty()
  fullName: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  phone: string;

  @IsString()
  @IsOptional()
  address?: string;
}