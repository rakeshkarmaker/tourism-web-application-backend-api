import { Body, Controller, Post, Put, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto } from './dtos/signup.dto';
import { LoginDto } from './dtos/login.dto';
import { ForgotPassDto } from './dtos/forget_pass.dto';
import { RefreshTokenDto } from './dtos/refresh-tokens.dto';//v1.4.3- Refresh
import { sendotpDto } from './dtos/sendotp.dto';
import { ChangePassDto } from './dtos/change_pass.dto';
import { AuthGuard } from '../guards/auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly AuthService:AuthService){}

  
  @Post('signup')//Post Signup
  async signUp(@Body() signupData:SignupDto){
    
    return this.AuthService.signup(signupData);

  }
  
  @Post('login')//Post Login
  async login(@Body() credentials:LoginDto){
    return this.AuthService.login(credentials)


  }
  
  @Post('reqOtp')//v1,3.1 - Req OTP
  async reqOtp(@Body() email:sendotpDto){
    return this.AuthService.sendOtp(email);
  }

  @UseGuards(AuthGuard) // Protected
  @Post('refresh')//v1.4.3- Refresh Token
  async refreshTokens(@Body() refreshTokenDto:RefreshTokenDto){
    return this.AuthService.refreshTokens(refreshTokenDto.refreshToken);
  }

  
  @Post('forget-pass')//v1.5.1- ForgetPassword
  async reserPassword(@Body() forgotPass:ForgotPassDto){
    return this.AuthService.forgotPass(forgotPass);
  }

  //v1.7.0 - Change Passward
  @UseGuards(AuthGuard) // Protect all routes
  @Put('change-pass')
  async changePassword(@Req() req,@Body() changePass: ChangePassDto) {
    const userId = req.userId; // Assuming the userId is in the JWT payload
    return await this.AuthService.changePassword(userId, changePass);
  }
  
  //v1.7.5- Logout
  @UseGuards(AuthGuard) // Protect all routes
  @Post('logout')
  async logout(@Req() req) {
    const userId = req.userId; // Assuming the userId is in the JWT payload
    return await this.AuthService.logout(userId); // Log the user out
  }
  
}

