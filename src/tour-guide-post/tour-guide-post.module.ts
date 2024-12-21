import { Module } from '@nestjs/common';
import { TourGuidePostService } from './tour-guide-post.service';
import { TourGuidePostController } from './tour-guide-post.controller';
import { GUIDE_POST } from '../database/entities/tour_post.entity';
import { USER_INFO } from '../database/entities/user_info.entity';
import { LOGIN_INFO } from '../database/entities/login_info.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [
    DatabaseModule, // Import the database module
    TypeOrmModule.forFeature([LOGIN_INFO,USER_INFO,GUIDE_POST]), // Register USER_INFO entity for this module,
  ],
  providers: [TourGuidePostService],
  controllers: [TourGuidePostController],
})
export class TourGuidePostModule {}
