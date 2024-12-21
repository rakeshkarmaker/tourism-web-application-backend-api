//v1.3.1- adding email for otp
import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { MailController } from './mail.controller';
import { MailService } from './mail.service';
import * as dotenv from 'dotenv';
dotenv.config();




@Module({
  imports: [
    MailerModule.forRoot({//v1.3.1- adding email | v1.7.3 - Added env security
      transport:{
        host:process.env.MAIL_HOST,
        port: parseInt(process.env.MAIL_PORT, 10), // Port 587 for TLS
        secure: process.env.MAIL_SECURE === 'true', // Use TLS, not SS
        auth:{
          user:process.env.MAIL_USER,
          pass:process.env.MAIL_PASS,
        },
        tls: {
            rejectUnauthorized: false,
        },
      },
      defaults: {
        from: '"No Reply" <tourifybd@gmail.com>',
      },
    }),
    
  ],
  exports: [MailService,MailerModule], //needed in other modules
  controllers: [MailController],
  providers: [MailService],
})
export class MailModule {}
