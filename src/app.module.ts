import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module'; //Connecting the Database
// import { TypeOrmModule } from '@nestjs/typeorm';//For  Database connection test entity - CRUD Operation part.
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
// import { jwtConstants } from './auth/constants';
//v1.3.1- adding email
//v.1.4.2- config adding.
import config from './config/config';//npm i @nestjs/config
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TourProfileModule } from './tour-profile/tour-profile.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { TourGuidePostModule } from './tour-guide-post/tour-guide-post.module';
import { ChatModule } from './chat/chat.module';
import { FileModule } from './file/file.module';

@Module({
  imports: [
    DatabaseModule,
    AuthModule,
    ConfigModule.forRoot({
      isGlobal:true,
      cache:true,
      load:[config],

    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (config) => ({
        secret: config.get('jwt.secret'),
      }),
      global:true,
      inject:[ConfigService]
    }),
    MailerModule,
    TourProfileModule,
    TourGuidePostModule,
    ChatModule,
    FileModule,
    
  ],
  controllers: [AppController, ],
  providers: [AppService, ],
})
export class AppModule {}
