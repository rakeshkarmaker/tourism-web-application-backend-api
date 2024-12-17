// v1.4.0- Email promotinal api system and email sending system added
import { IsEmail, IsString, IsNumber, IsOptional } from 'class-validator';

export class TourAdvertisementDto {
  @IsEmail() // Ensuring email is valid
  email: string;

  @IsString() // Ensuring the tour name is a string
  tourName: string;

  @IsString() // Ensuring location is a string
  location: string;

  @IsString() // Ensuring the description is a string
  description: string;

  @IsNumber() // Ensuring the price is a number
  price: number;

  @IsOptional() // This field is optional (We can add images, links, etc.)
  @IsString()
  imageUrl?: string;
}
