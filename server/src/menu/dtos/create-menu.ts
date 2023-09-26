import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

class CreateMenuDto {
  @IsNotEmpty()
  @IsString()
  menuName: string;

  @IsNotEmpty()
  @IsString()
  image: string;

  @IsNotEmpty()
  price: number;
}

export default CreateMenuDto;
