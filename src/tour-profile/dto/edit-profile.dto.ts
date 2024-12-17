//v1.5.0 - Tour Profile Feature added
import { IsString, IsOptional, IsEmail, IsISO8601 } from 'class-validator';

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
  @IsISO8601() // v1.5.0 - Replacing @IsDate() with @IsISO8601() | ISO 8601 format like "2024-06-18"
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
