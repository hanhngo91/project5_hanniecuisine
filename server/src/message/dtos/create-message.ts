import { IsEmail, IsNotEmpty, Max, MaxLength } from 'class-validator';

class CreateMessage {
  @IsNotEmpty()
  @MaxLength(10)
  firstName: string;

  @IsNotEmpty()
  @MaxLength(10)
  lastName: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  tel: string;

  @IsNotEmpty()
  @MaxLength(50)
  subject: string;

  @IsNotEmpty()
  @MaxLength(200)
  message: string;
}

export default CreateMessage;
