import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LOGIN_INFO } from '../database/entities/login_info.entity';
import { USER_INFO } from '../database/entities/user_info.entity';
import { MailModule } from 'src/mail/mail.module';
import { DatabaseModule } from 'src/database/database.module';
import { AuthHelper } from './auth.helper';

@Module({
  imports: [//v1.4.2- Removed multiple redeclaration of postgredsql and rather used import from database
    DatabaseModule, // Import the database module
    TypeOrmModule.forFeature([LOGIN_INFO,USER_INFO]), // Register USER_INFO entity for this module,
    MailModule
  ],
  controllers: [AuthController],
  providers: [AuthService,AuthHelper]
})
export class AuthModule {}
