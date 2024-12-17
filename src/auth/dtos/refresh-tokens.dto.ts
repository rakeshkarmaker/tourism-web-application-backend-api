

//v1.4.3- Refresh Token DTO

import { IsString } from "class-validator";

export class RefreshTokenDto{
    @IsString()
    refreshToken:string;
}