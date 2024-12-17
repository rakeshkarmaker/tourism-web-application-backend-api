//v-1.5.2 - Forgot pass compromised so making a new DTO for send OTP

import { IsEmail, IsNotEmpty } from 'class-validator';

export class sendotpDto {
  @IsEmail({}, { message: 'Please provide a valid email address' })
  @IsNotEmpty({ message: 'Email field cannot be empty' })
  email: string;
}
