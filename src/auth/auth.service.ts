import {
  BadGatewayException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { SignupDto } from './dtos/signup.dto';
import { USER_INFO } from 'src/database/entities/user_info.entity';
import { LOGIN_INFO } from 'src/database/entities/login_info.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt'; // npm i @types/bcrypt
import { LoginDto } from './dtos/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(LOGIN_INFO)
    private loginRepo: Repository<LOGIN_INFO>,

    @InjectRepository(USER_INFO)
    private userRepo: Repository<USER_INFO>,

    private jwtService: JwtService,
  ) {}

  //JWT Access token Generation
  async generateUserTokens(userID) {
    const accessToken = this.jwtService.sign({ userID });
    //RefreashToken alternative: https://www.npmjs.com/package/uuid
    const refreshToken = this.jwtService.sign({ userID }, { expiresIn: '7d' }); // long-lived refresh token

    return{
      accessToken,
      refreshToken
    };
     
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

    //Generate JWT Token => npm install --save @nestjs/jwt
    // const token = this.jwtService.sign(payload);

    // user.refreshToken = refreshToken;
    // await this.loginRepo.save(user);

    // return this.generateUserTokens(user.id )

    // return {
    //   message: 'Login Successful!.',
    // };

    // Generate JWT token and refresh token
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

}
