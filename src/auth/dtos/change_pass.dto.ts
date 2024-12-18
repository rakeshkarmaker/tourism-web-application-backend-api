// v1.7.0 - Change Passward

import { IsString, MinLength } from 'class-validator';

export class ChangePassDto {



  @IsString()
  @MinLength(6, { message: 'The Current password must be at least 6 characters long.' })
  currentPassword: string;

  @IsString()
  @MinLength(8, { message: 'New password must be at least 8 characters long.' })
  newPassword: string;
}
