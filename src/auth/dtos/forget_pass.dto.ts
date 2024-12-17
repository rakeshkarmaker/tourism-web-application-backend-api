import { IsEmail, IsNotEmpty } from 'class-validator';

export class ForgotPassDto {
  @IsEmail({}, { message: 'Please provide a valid email address' })
  @IsNotEmpty({ message: 'Email field cannot be empty' })
  email: string;
}
