import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto } from './dtos/signup.dto';
import { LoginDto } from './dtos/login.dto';
import { ForgotPassDto } from './dtos/forget_pass.dto';

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
  async reqOtp(@Body() email:ForgotPassDto){
    return this.AuthService.sendOtp(email);
  }
}

