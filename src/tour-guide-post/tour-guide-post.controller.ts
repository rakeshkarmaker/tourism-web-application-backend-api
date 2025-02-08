
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
        const guideID = req.userID;
        return this.tourGuideService.findPostsByGuide(guideID);
    }

    // Postman link: http://localhost:3000/tour-guide-post/create
    @Post('create')
    async createGuidePost(@Req() req,@Body() createTourGuide: CreateTourGuideDto) {
        const guideID = req.userID;
        console.log("User ID:", guideID); // Debugging
        return this.tourGuideService.createGuidePost(createTourGuide,guideID);
    }
    

    // Postman link: http://localhost:3000/tour-guide-post/update/1
    //V3.0.1-Update a guide post
    @Put('update/:id')
    async editGuidePost(@Req() req,@Param('id') guidePostId: number,@Body () updatePost: UpdateGuidePostDto,) {
        const guideID = req.userID;
        return this.tourGuideService.updateTourGuide(guideID,guidePostId, updatePost);
    }

    // Postman link: http://localhost:3000/tour-guide-post/delete/1
    //V3.0.1-Delete a guide post Updated
    @Delete('delete/:id')
    async deleteGuidePost(@Req() req,@Param('id') guidePostId: number) {
        const guideID = req.userID;
        console.log("User ID:", guideID); // Debugging
        return this.tourGuideService.deleteGuidePost(guideID,guidePostId);
    }
    
}
