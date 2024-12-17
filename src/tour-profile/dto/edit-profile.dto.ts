//v1.5.0 - Tour Profile Feature added
import { IsString, IsOptional, IsDate, IsEmail } from 'class-validator';

export class EditProfileDto {// Methods are optional as changes are not nessarily required
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  phone_no?: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsDate()
  dob?: Date;

  @IsOptional()
  @IsString()
  gender?: string;

  @IsOptional()
  @IsString()
  profile_pic_path?: string;

  @IsOptional()
  @IsString()
  description?: string;
}
