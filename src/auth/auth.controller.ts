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

  //Post Signup
  @Post('signup')
  async signUp(@Body() signupData:SignupDto){
    
    return this.AuthService.signup(signupData);

  }
  //Post Login
  @Post('login')
  async login(@Body() credentials:LoginDto){
    return this.AuthService.login(credentials)


  }

  
  //Post Refeash Token
  //v1,3.1 - Req OTP
  @Post('reqOtp')
  async reqOtp(@Body() email:sendotpDto){
    return this.AuthService.sendOtp(email);
  }

  //v1.4.3- Refresh
  @Post('refresh')
  async refreshTokens(@Body() refreshTokenDto:RefreshTokenDto){
    return this.AuthService.refreshTokens(refreshTokenDto.refreshToken);
  }

  //v1.5.1- ForgetPassword
  @Post('resetpass')
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
  
}

