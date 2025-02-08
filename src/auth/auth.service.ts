import {
  BadGatewayException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { SignupDto } from './dtos/signup.dto';
import { USER_INFO } from 'src/database/entities/user_info.entity';
import { LOGIN_INFO } from 'src/database/entities/login_info.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt'; // npm i @types/bcrypt
import { LoginDto } from './dtos/login.dto';
import { ForgotPassDto } from './dtos/forget_pass.dto';
import { MailService } from '../mail/mail.service';
import { ChangePassDto } from './dtos/change_pass.dto';
import { AuthHelper } from './auth.helper';
import { sendotpDto } from './dtos/sendotp.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(LOGIN_INFO)
    private loginRepo: Repository<LOGIN_INFO>,

    @InjectRepository(USER_INFO)
    private userRepo: Repository<USER_INFO>,

    private authHelper: AuthHelper,
    private mailService: MailService, // v1.3.1- Email authentication
  ) {}



  //Signup
  async signup(signupData: SignupDto) {
    
    const { name, email, password, ...otherUserInfos } = signupData;//Using destructor

    //checking if email already exists.
    const emailInUser = await this.userRepo.findOne({ where: { email } });
    if (emailInUser) {
      throw new BadGatewayException('The email is already in use.');
    }
    //Hashing the password.
    const hashedPassword = await bcrypt.hash(password, 11); //  the password field must be a string, but you're attempting to pass a Promise<string> due to not awaiting the bcrypt.hash function.

    //Create the User and save in database.
    const user = await this.userRepo.create({name,email,...otherUserInfos,});

    // Save the user to the database
    const savedUser = await this.userRepo.save(user);
    const login = this.loginRepo.create({user: savedUser,email,password: hashedPassword,});

    // Save the login information to the database
    await this.loginRepo.save(login);

    return { message: 'Signup successful', userId: savedUser.id };
  }

  //Login
  async login(credentials: LoginDto) {
    console.log(credentials);
    const { email, password } = credentials;

    //checking if email already exists.
    const user = await this.loginRepo.findOne({ where: { email }, relations: ['user'] });

    if (!user) {
      throw new UnauthorizedException('Wrong Credentials!');
    }

    const passworMatch = await bcrypt.compare(password, user.password);

    if (!passworMatch) {
      throw new UnauthorizedException('Wrong Credentials!');
    }
    const { accessToken, refreshToken,expDate } = await this.authHelper.saveRefreshToken(user); //v1.4.3- refresh Tokens | here the approach is replaced by a save function to reuse it elsewhere

    ////v1.4.3- refresh Tokens | here the approach is replaced by a save function to reuse it elsewhere
    return { access_token: accessToken, refresh_token: refreshToken, expDate: expDate, 
      user: {
        id: user.user.id,
        name: user.user.name,
        email: user.email,
        phone_no: user.user.phone_no,
        address: user.user.address,
        dob: user.user.dob,
      } };

  }
  

  //v1.4.3- refresh Tokens
  async refreshTokens(refreshToken: string) {
    //Verifying refresh token exists and is not expired!
    const token = await this.loginRepo.findOne({where: { refreshToken: refreshToken },});

    if (!token || new Date(token.refTokenExpDate) <= new Date()) { //if token is invalid or time is up, throw error!
      throw new UnauthorizedException('Not found. Invalid Request.');
      
    }
    return this.authHelper.saveRefreshToken(token); // If the user token is valid, generating a new token
  }

    //v1.3.1-OTP request for, Forget Password
    async sendOtp(forgotPasswordDto: sendotpDto) {
      const { email } = forgotPasswordDto;
  
      // Check if the user exists in the database
      const user = await this.loginRepo.findOne({ where: { email } });
  
      if (!user) {
        throw new NotFoundException('User not found. Invalid Request.');
      }
  
      const { otp, expDate } = await this.authHelper.generateSecureOTP(); // Generating a reset token

      // Storing the reset token and expiration date in the database
      user.resetToken = otp;
      user.resetTokenExpDate = expDate;
      await this.loginRepo.save(user);
  
      
      await this.mailService.sendMail(// Send email with the otp => https://www.nodemailer.com/
        user.email,
        'Password Reset OTP Request',
        `Use this OTP to reset your password. OTP: ${otp}`,
      );
  
      return {message: 'Password reset token sent to email',otp,};// Removable in production
    }

  //v1.5.1- ForgetPassword
  async forgotPass(forgotPasswordDto: ForgotPassDto) {
    const { email, otp } = forgotPasswordDto;

    // Check if the user exists in the database
    const user = await this.loginRepo.findOne({ where: { email } });

    if (!user) {
      throw new NotFoundException('User not found. Invalid Request.');
    }

    if (user.resetToken === otp && new Date(user.resetTokenExpDate) >= new Date() ) {
      // If reset token mactchs and reset time still valid then return true => send reset Pass

      //Generating Password
      const { password, hash } = await this.authHelper.generateAndHashPassword();
      user.password = hash; //Setting hashed new password in the DB

      //Sending Email to the user
      this.mailService.sendMail(
        email,
        'Your Tourify Accoount Password has been reset!',
        `'Your Password Has been reset and Recovery pass is: ${password}`,
      );

      //Return values
      return {
        message: 'Your Password Has been reset and Recovery pass send to email.',
        New_Password: password,
      };
    } else {
      throw new UnauthorizedException('Invalid OTP or Email.');
    }
  }

  //v1.6.0 - Logout
  // Logout
  async logout(userId: number): Promise<{ message: string }> {
    const user = await this.loginRepo.findOne({ where: { id: userId } });

    if (!user) {
      throw new NotFoundException('User not found. Invalid Request.');
    }

    user.refreshToken = null; // Deleting tokens
    user.refTokenExpDate = null;
    user.resetToken = null;
    user.resetTokenExpDate = null;

    await this.loginRepo.save(user);

    return {message: `Logout successful.Token set to ${user.refreshToken} and date set to ${user.refTokenExpDate}`};
  }

  // v1.7.0 - Change Passward
  async changePassword(
    userId: number,
    changePass: ChangePassDto,
  ): Promise<{ message: string }> {
    const { currentPassword, newPassword } = changePass;

    const user = await this.loginRepo.findOne({ where: { id: userId } });

    if (!user) {
      throw new NotFoundException('User not found. Invalid Request.');
    }

    const isPasswordValid = await bcrypt.compare(currentPassword,user.password,);
    
    if (!isPasswordValid) {
      throw new UnauthorizedException('Incorrect current password.');
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 11); // Hashing
    user.password = hashedNewPassword; // Update pass

    user.refreshToken = null; // Good Practice)(), log out all active sessions by clearing the refresh tokens
    user.refTokenExpDate = null;

    await this.loginRepo.save(user);
    //Sending Email to the user
    this.mailService.sendMail(
      user.email,
      'Your Tourify Accoount Password has been Changes!',
      `'Your Password Has been Changed and Try recovery if you haven't changed your password.`,
    );

    // Return Success.
    return { message: 'Password changed successfully' };
  }
}
