
import { IsEmail, IsString } from 'class-validator';

export class SendMailDto {
  @IsEmail() // Ensuring email is valid
  email: string;

  @IsString() // Ensuring title is a string
  title: string;

  @IsString() // Ensuring message is a string
  message: string;
}
