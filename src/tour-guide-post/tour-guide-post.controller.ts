
import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../guards/auth.guard';
import { TourGuidePostService } from './tour-guide-post.service';
import { CreateTourGuideDto } from './dto/create-guide-post.dto';
import { UpdateGuidePostDto } from './dto/update-guide-post.dto';


@UseGuards(AuthGuard) // Protect all routes
@Controller('tour-guide-post')
export class TourGuidePostController {
    constructor(private readonly tourGuideService: TourGuidePostService) {}
    
    
    // Postman link: http://localhost:3000/tour-guide-post/view

    @Get('view')
    async viewGuidePost(@Req() req) {
        const userID = req.userID;
        return this.tourGuideService.findPostsByGuide(userID);
    }

    // Postman link: http://localhost:3000/tour-guide-post/create
    @Post('create')
    async createGuidePost(@Req() req,@Body() createTourGuide: CreateTourGuideDto) {
        const userId = req.userId;
        return this.tourGuideService.createGuidePost(createTourGuide,userId);
    }
    

    @Put('update/:id')
    async editGuidePost(@Param('id') guidePostId: number,@Body () updatePost: UpdateGuidePostDto,) {
        return this.tourGuideService.updateTourGuide(guidePostId, updatePost);
    }

    @Delete('delete/:id')
    async deleteGuidePost(@Param('id') guidePostId: number) {
        return this.tourGuideService.deleteGuidePost(guidePostId);
    }
    
}
