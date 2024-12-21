import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LOGIN_INFO } from 'src/database/entities/login_info.entity';
import { JwtService } from '@nestjs/jwt'; // v1.4.2- needed already given
import * as bcrypt from 'bcrypt';



@Injectable()
export class AuthHelper {
  constructor(
    @InjectRepository(LOGIN_INFO) private loginRepo: Repository<LOGIN_INFO>,
    private jwtService: JwtService,
  ) {}

    //JWT Access token Generation
    async generateUserTokens(userID: number) {
      const accessToken = this.jwtService.sign({ userID });
      //RefreashToken alternative: https://www.npmjs.com/package/uuid
      const refreshToken = this.jwtService.sign({ userID }, { expiresIn: '7d' }); // long-lived refresh token
  
      return {accessToken,refreshToken,};
    }
  
    //v1.4.3- refresh Tokens for this. function declared to save token
    async saveRefreshToken(user: LOGIN_INFO) {
      const { accessToken, refreshToken } = await this.generateUserTokens(user.id);
  
      //Date calculation
      const expDate = new Date();
      expDate.setDate(expDate.getDate() + 7); // Adding 7 days to the current date
  
      // Store refresh token in database
      user.refreshToken = refreshToken;
      user.refTokenExpDate = expDate;
      await this.loginRepo.save(user);
      return { accessToken, refreshToken, expDate };
    }
  

  //v1.3.1-Generate OTP Function
  async generateSecureOTP(
    otpLength: number = 8,
  ): Promise<{ otp: string; expDate: Date } | null> {//Installation: npm install uuid #Umm its overkill

    if (otpLength <= 4) return null; // Handling the invalid length minimum 4 digit otp

    // Generating an 8-digit OTP
    const otp = Array.from(crypto.getRandomValues(new Uint8Array(otpLength)),(num) => (num % 10).toString(),).join('');

    //Generating expiration of OTP:
    const expDate = new Date();
    expDate.setMinutes(expDate.getMinutes() + 15); // OTP is valid for 15 minutes

    return { otp, expDate };
  }



    async generateAndHashPassword(length: number = 12): Promise<{ password: string; hash: string }> {
        // Characters to be used in the password
        const charset ='abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?';
        // Generate a secure random password
        const passwordArray = Array.from(crypto.getRandomValues(new Uint8Array(length)));
        const password = passwordArray.map((num) => charset[num % charset.length]).join('');
    
        // Hash the password using bcrypt
        const hash = await bcrypt.hash(password, 11); // Cost factor for bcrypt =11 here 300ms+ time required
    
        return { password, hash };
      }




}
