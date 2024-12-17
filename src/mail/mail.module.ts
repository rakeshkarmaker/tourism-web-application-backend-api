//v1.3.1- adding email for otp
import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { MailController } from './mail.controller';
import { MailService } from './mail.service';




@Module({
  imports: [
    MailerModule.forRoot({//v1.3.1- adding email
      transport:{
        host:'smtp.gmail.com',
        port: 465, // Port 587 for TLS
        secure: true, // Use TLS, not SS
        auth:{
          user:'tourifybd@gmail.com',
          pass:'gzpyrxagtjtawehh',
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
