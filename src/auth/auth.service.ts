import { BadGatewayException, Injectable } from '@nestjs/common';
import { SignupDto } from './dtos/signup.dto';
import { USER_INFO } from 'src/database/entities/user_info.entity';
import { LOGIN_INFO } from 'src/database/entities/login_info.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt'; // npm i @types/bcrypt

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(LOGIN_INFO)
    private loginRepo: Repository<LOGIN_INFO>,

    @InjectRepository(USER_INFO)
    private userRepo: Repository<USER_INFO>,
  ) {}



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
}
