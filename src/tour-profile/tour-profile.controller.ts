
//v1.5.0 - Tour Profile Feature added

import { Controller, Get, Put, Body, Request } from '@nestjs/common';
import { TourProfileService } from './tour-profile.service';
import { EditProfileDto } from './dto/edit-profile.dto';
// import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('tour-profile')
// @UseGuards(JwtAuthGuard) // Protect all routes
export class TourProfileController {
  constructor(private readonly tourProfileService: TourProfileService) {}

  // View Tour Profile
  @Get('view')
  async getProfile(@Request() req) {
    const userId = req.user.id; // Extracted from JWT payload
    return this.tourProfileService.getTourProfile(userId);
  }

  // Edit Tour Profile
  @Put('edit')
  async editProfile(@Request() req, @Body() editProfileDto: EditProfileDto) {
    const userId = req.user.id;
    return this.tourProfileService.updateTourProfile(userId, editProfileDto);
  }
}




