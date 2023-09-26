import { IsString, IsNotEmpty, IsNumber, IsEmail } from 'class-validator';

class CreateReservationDto {
  @IsNotEmpty()
  @IsString()
  customerName: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  tel: string;

  @IsNotEmpty()
  diningDate: string;

  @IsNotEmpty()
  diningTime: string;

  @IsNotEmpty()
  area: string;

  @IsNotEmpty()
  @IsNumber()
  guests: number;

  @IsNotEmpty()
  @IsNumber()
  discountPercentage: number;

  @IsNotEmpty()
  @IsNumber()
  total: number;

  @IsNotEmpty()
  menu: string;
}

export default CreateReservationDto;
