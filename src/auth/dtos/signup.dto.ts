import {
  IsString,
  IsEmail,
  IsNotEmpty,
  Length,
  MinLength,
  Matches,
  IsDateString,
  IsOptional,
} from 'class-validator';

export class SignupDto {
  // for dto Installed: npm i --save class-validator class-transformer
  @IsNotEmpty()
  @IsString()
  @Length(1, 100)
  name: string;

  @IsNotEmpty()
  @IsEmail()
  @Length(1, 100)
  email: string;

  @IsString()
  @MinLength(6)
  @Matches(/^(?=.*[0-9])/, {
    message: 'Password must contain atleast 1 number!',
  })
  password: string;
  // [key: string]: any; // Allows additional fields for user info

  //...Rest
  @IsNotEmpty()
  @IsString()
  @Length(10, 15)
  phone_no: string;

  @IsNotEmpty()
  @IsString()
  @Length(1, 255)
  address: string;

  @IsNotEmpty()
  @IsDateString()
  dob: Date;

  @IsNotEmpty()
  @IsString()
  gender: string;

  @IsNotEmpty()
  @IsString()
  nid_no: string;

  @IsOptional()
  @IsString()
  nid_pic_path?: string;

  @IsOptional()
  @IsString()
  profile_pic_path?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsNotEmpty()
  @IsString()
  user_type: string;
}
