
import { IsString, IsEmail, IsNotEmpty, IsOptional, IsNumber, IsDate, Length } from 'class-validator';

export class SignupDto {
  @IsNotEmpty()
  @IsString()
  @Length(1, 100)
  name: string;

  @IsNotEmpty()
  @IsEmail()
  @Length(1, 100)
  email: string;

  @IsNotEmpty()
  @IsNumber()
  phone_no: number;

  @IsNotEmpty()
  @IsString()
  address: string;

  @IsNotEmpty()
  @IsDate()
  dob: Date;

  @IsNotEmpty()
  @IsString()
  gender: string;

  @IsNotEmpty()
  @IsNumber()
  nid_no: number;

  @IsNotEmpty()
  @IsString()
  nid_pic_path: string;

  @IsNotEmpty()
  @IsString()
  profile_pic_path: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  user_type: string;
}

  