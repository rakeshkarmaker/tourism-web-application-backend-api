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
import { JwtService } from '@nestjs/jwt'; // v1.4.2- needed already given
import { ForgotPassDto } from './dtos/forget_pass.dto';



// import { MailController } from './mail/mail.controller';
import { MailService } from '../mail/mail.service';
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(LOGIN_INFO)
    private loginRepo: Repository<LOGIN_INFO>,

    @InjectRepository(USER_INFO)
    private userRepo: Repository<USER_INFO>,

    private jwtService: JwtService,
    private mailService:MailService, // v1.3.1- Email authentication
    private jwtservice: JwtService,//v1.4.2- JWT refresh and guard.

  ) {}

  //JWT Access token Generation
  
  async generateUserTokens(userID: number) {
    const accessToken = this.jwtService.sign({ userID });
    //RefreashToken alternative: https://www.npmjs.com/package/uuid
    const refreshToken = this.jwtService.sign({ userID }, { expiresIn: '7d' }); // long-lived refresh token
    

    return{
      accessToken,
      refreshToken
    };
     
  }

  //v1.4.3- refresh Tokens for this. function declared to save token
  async saveRefreshToken(user: LOGIN_INFO){
    const { accessToken, refreshToken } = await this.generateUserTokens(user.id);

    //Date calculation
    const expDate =new Date();
    expDate.setDate(expDate.getDate() + 7); // Adding 7 days to the current date

    // Store refresh token in database
    user.refreshToken = refreshToken;
    user.refTokenExpDate = expDate;
    await this.loginRepo.save(user);
    return {accessToken, refreshToken, expDate};
  }


  //Signup

  async signup(signupData: SignupDto) {
    //Using destructor
    const { name, email, password, ...otherUserInfos } = signupData;

    //checking if email already exists.
    const emailInUser = await this.userRepo.findOne({ where: { email } });
    if (emailInUser) {
      throw new BadGatewayException('The email is already in use.');
    }
    //Hashing the password.
    const hashedPassword = await bcrypt.hash(password, 11); //  the password field must be a string, but you're attempting to pass a Promise<string> due to not awaiting the bcrypt.hash function.

    //Create the User and save in database.
    const user = await this.userRepo.create({
      name,
      email,
      ...otherUserInfos,
    });
    // Save the user to the database
    const savedUser = await this.userRepo.save(user);
    const login = this.loginRepo.create({
      user: savedUser, // Link the saved USER_INFO entity
      email,
      password: hashedPassword,
    });

    // Save the login information to the database
    await this.loginRepo.save(login);

    return { message: 'Signup successful', userId: savedUser.id };
  }

  //Login
  async login(credentials: LoginDto) {
    const { email, password } = credentials;

    //checking if email already exists.
    const user = await this.loginRepo.findOne({ where: { email } });

    if (!user) {
      throw new UnauthorizedException('Wrong Credentials!');
    }

    const passworMatch = await bcrypt.compare(password, user.password);

    if (!passworMatch) {
      throw new UnauthorizedException('Wrong Credentials!');
    }

    ////v1.4.3- refresh Tokens | here the approach is replaced by a save function to reuse it elsewhere

    // return {accessToken, refreshToken, expDate};
    return await this.saveRefreshToken(user);
    
  }

  //v1.3.1-Generate OTP Function
  async generateSecureOTP(otpLength:number=8): Promise<{ otp: string; expDate: Date }|null> {//Installation: npm install uuid #Umm its overkill

    if (otpLength <= 4) return null; // Handling the invalid length minimum 4 digit otp

    // Generating an 8-digit OTP
    const otp = Array.from(crypto.getRandomValues(new Uint8Array(otpLength)), (num) => (num % 10).toString()).join('');

    //Generating expiration of OTP:
    const expDate = new Date();
    expDate.setMinutes(expDate.getMinutes() + 15); // OTP is valid for 15 minutes

    return {otp,expDate};
  }

  //v1.3.1-OTP request for, Forget Password
  async sendOtp(forgotPasswordDto: ForgotPassDto) {
    const { email } = forgotPasswordDto;
  
    // Check if the user exists in the database
    const user = await this.loginRepo.findOne({ where: { email } });
  
    if (!user) {
      throw new NotFoundException('User not found. Invalid Request.');
    }
  
    // Generate a reset token
    const {otp,expDate} =await this.generateSecureOTP();
  
    // Store the reset token and expiration date in the database
    user.resetToken = otp;
    user.resetTokenExpDate = expDate;
    await this.loginRepo.save(user);
  
    // Send email with the otp => https://www.nodemailer.com/
    await this.mailService.sendMail(
      user.email,
      'Password Reset OTP Request',
      `Use this OTP to reset your password. OTP: ${otp}`
    );
  
    return {
      message: 'Password reset token sent to email',
      otp, // Removable in production
    };
  }



  //v1.4.3- refresh Tokens
  async refreshTokens(refreshToken:string){
    //Verifying refresh token exists and is not expired!
    const token = await this.loginRepo.findOne({ where: { refreshToken: refreshToken } })

    if(!token || new Date(token.refTokenExpDate) <= new Date()){ //if token is invalid or time is up, throw error!
      throw new UnauthorizedException('Not found. Invalid Request.');

    }
    return this.saveRefreshToken(token);// If the user token is valid, generating a new token
    
  }

    
  

}
