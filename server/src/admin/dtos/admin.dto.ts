import { IsEmail, IsNotEmpty } from 'class-validator';

export class AdminLoginDto {
  @IsNotEmpty()
  @IsEmail()
  adminEmail: string;

  @IsNotEmpty()
  adminPassword: string;
}
