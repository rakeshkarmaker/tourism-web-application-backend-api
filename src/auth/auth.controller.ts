import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto } from './dtos/signup.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly AuthService:AuthService){}

  //Post Signup
  @Post('signup')
  async signUp(@Body() signupData:SignupDto){
    
    return this.AuthService.signup(signupData);

  }
  //Post Login
  //Post Refeash Token
}

