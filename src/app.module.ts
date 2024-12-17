import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module'; //Connecting the Database
// import { TypeOrmModule } from '@nestjs/typeorm';//For  Database connection test entity - CRUD Operation part.
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './auth/constants';
//v1.3.1- adding email
import { MailModule } from './mail/mail.module';
//v1.5.0 - Tour Profile Feature added
import { TourProfileModule } from './tour-profile/tour-profile.module';

@Module({
  imports: [
    DatabaseModule,
    AuthModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
    MailModule,
    TourProfileModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
