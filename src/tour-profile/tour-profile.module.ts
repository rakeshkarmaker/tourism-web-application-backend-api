
//v1.5.0 - Tour Profile Feature added

import { Module } from '@nestjs/common';
import { TourProfileService } from './tour-profile.service';
import { TourProfileController } from './tour-profile.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LOGIN_INFO } from 'src/database/entities/login_info.entity';
import { USER_INFO } from 'src/database/entities/user_info.entity';
import { MailModule } from 'src/mail/mail.module';
import { DatabaseModule } from 'src/database/database.module';
// import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports:[ //v1.4.2- Removed multiple redeclaration of postgredsql and rather used import from database
    DatabaseModule, // Import the database module
    TypeOrmModule.forFeature([LOGIN_INFO,USER_INFO]), // Register USER_INFO entity for this module,
      MailModule
    ],
  providers: [TourProfileService],
  controllers: [TourProfileController]
})
export class TourProfileModule {}
