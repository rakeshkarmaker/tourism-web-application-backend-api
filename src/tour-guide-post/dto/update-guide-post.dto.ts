import { IsString, IsOptional, IsArray } from 'class-validator';

export class UpdateGuidePostDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  activities?: string;

  @IsString()
  @IsOptional()
  included?: string;

  @IsString()
  @IsOptional()
  notIncluded?: string;

  @IsString()
  @IsOptional()
  details?: string;

  @IsString()
  @IsOptional()
  meetingAddress?: string;

  @IsString()
  @IsOptional()
  googleMapLink?: string;

  @IsOptional()
  @IsArray()
  images: string[];

}
