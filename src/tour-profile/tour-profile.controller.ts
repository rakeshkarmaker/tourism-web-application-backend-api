
//v1.5.0 - Tour Profile Feature added

import { Controller, Get, Put, Body, UseGuards, Req } from '@nestjs/common';
import { TourProfileService } from './tour-profile.service';
import { EditProfileDto } from './dto/edit-profile.dto';
import { AuthGuard } from '../guards/auth.guard';
// import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(AuthGuard) // Protect all routes
@Controller('tour-profile')
export class TourProfileController {
  constructor(private readonly tourProfileService: TourProfileService) {}

  //v1.5.0- View Tour Profile
  @Get('view')
  async getProfile(@Req() req) {
    const userId = req.userID; // Extracted from JWT payload
    return this.tourProfileService.getTourProfile(userId);
  }

  //v1.5.0- Edit Tour Profile
  @Put('edit')
  async editProfile(@Req() req, @Body() editProfileDto: EditProfileDto) {
    const userId = req.userID;
    return this.tourProfileService.updateTourProfile(userId, editProfileDto);
  }
}




