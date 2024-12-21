import { IsString, IsOptional, IsArray } from 'class-validator';

export class CreateTourGuideDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsOptional()
  @IsString()
  activities: string;

  @IsOptional()
  @IsString()
  included: string;

  @IsOptional()
  @IsString()
  notIncluded: string;

  @IsOptional()
  @IsString()
  details: string;

  @IsOptional()
  @IsString()
  meetingAddress: string;

  @IsOptional()
  @IsString()
  googleMapLink: string;

  @IsOptional()
  @IsArray()
  images: string[];
}
