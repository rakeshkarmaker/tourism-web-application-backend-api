import { Module } from '@nestjs/common';
import { TourGuidePostService } from './tour-guide-post.service';

@Module({
  providers: [TourGuidePostService]
})
export class TourGuidePostModule {}
