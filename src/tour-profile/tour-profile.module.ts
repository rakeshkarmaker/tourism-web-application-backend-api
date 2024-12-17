import { Module } from '@nestjs/common';
import { TourProfileService } from './tour-profile.service';
import { TourProfileController } from './tour-profile.controller';

@Module({
  providers: [TourProfileService],
  controllers: [TourProfileController]
})
export class TourProfileModule {}
