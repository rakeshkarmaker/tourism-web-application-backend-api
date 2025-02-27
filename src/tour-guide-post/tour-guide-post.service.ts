////file name: tour-guide-post.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTourGuideDto } from './dto/create-guide-post.dto';
import { GUIDE_POST } from '../database/entities/tour_post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateGuidePostDto } from './dto/update-guide-post.dto';
import { USER_INFO } from 'src/database/entities/user_info.entity';

//v2.0.0- Service for Tour Guide Post
@Injectable()
export class TourGuidePostService {
  
  constructor(
    @InjectRepository(GUIDE_POST)
    private readonly tourPostRepository: Repository<GUIDE_POST>,
    @InjectRepository(USER_INFO)
    private readonly userRepository: Repository<USER_INFO>,
  ) {}

  //V3.2.0- Find a post by ID
  async findPostById(guidePostId: number): Promise<GUIDE_POST> {
    const guidePost = await this.tourPostRepository.findOne({where : {id: guidePostId}});

    if (!guidePost) {
      throw new NotFoundException(`Tour Guide Post not found`);
    }
    return guidePost;
  }
  //v2.0.0- Create Tour Guide Post
  async createGuidePost(createTourPost: CreateTourGuideDto,userId: number): Promise<GUIDE_POST> {
    const tourGuide = await this.userRepository.findOne({ where: { id: userId, user_type: 'TourGuide' } });

    if (!tourGuide) {
        throw new NotFoundException(`Tour Guide is not found`);
    }

    // Create the TourPost and link it to the TourGuide (user)
    const tourPost = this.tourPostRepository.create({
        ...createTourPost, // Data from body and checked by DTO
        //V3.1.0- Fixing the createdBy field to be the TourGuide id instead of the user id
        createdBy: tourGuide, // Linking the post to the authenticated user (TourGuide)
      });

    return this.tourPostRepository.save(tourPost);
  }


  //v2.0.0-  Get posts of a specific tour guide
  async findPostsByGuide(guideId: number): Promise<GUIDE_POST[]> {

    const user = await this.userRepository.findOne({where: { id: guideId, user_type: 'TourGuide' }});

    if (!user) {
      throw new NotFoundException('Tour guide not found');
    }

    return this.tourPostRepository.find({
        where: {createdBy: { id: guideId }, // Filtering by the TourGuide's userId | Update the query was returning id = 2 for token of id=1. I dont know why. Deducing 1 from the id to get the correct id of the userid output resulted in solving the issue!
        },
        relations: ['createdBy'], // Ensuring the 'createdBy' field inclusion
      });
  }
  

  //v2.0.0- Update Tour Guide Post
  async updateTourGuide(guideID: number, guidePostId: number, updateGuide: UpdateGuidePostDto,): Promise<GUIDE_POST> {
    
    // const guidePost = await this.tourPostRepository.findOneBy({id: guidePostId,}); //This does not work
    //Why? Because findOneBy is not a function of Repository. It should be findOne instead. Plus because createdBy is a relation.
    
    //v3.1.0- Fixing the update method to check if the post was created by the authenticated user.
    const guidePost = await this.tourPostRepository.findOne({
        where: { id: guidePostId },
        relations: ['createdBy'], // Ensure 'createdBy' data is included
    });

    if (!guidePost) {
      throw new NotFoundException(`Tour Guide Post not found`);
    }
    console.log("Guide Post by who:", guidePost.createdBy.id); // Debugging
    console.log("Guide update action ID:", guideID); // Debugging

    //V3.1.0-(Authorized update check) Checking if the post was created by the authenticated user
    if(guidePost.createdBy.id !== guideID){
      throw new NotFoundException(`You are not authorized to update this post`);
    }

    Object.assign(guidePost, updateGuide); // Updating fields with the new values from the DTO

    this.tourPostRepository.save(guidePost); // Save the updated post
    return guidePost;
  }

//   v2.0.0- Delete Tour Guide Post
  async deleteGuidePost(guideID: number, guidePostId: number) {
    //v3.1.0- Fixing the update method to check if the post was created by the authenticated user
    const guidePost = await this.tourPostRepository.findOne({
      where: { id: guidePostId },
      relations: ['createdBy'], // Ensure 'createdBy' data is included
    });

    if (!guidePost) {
      throw new NotFoundException(`Tour Guide Post not found`);
    }
    //V3.1.0-(Authorized update check) Checking if the post was created by the authenticated user
    if(guidePost.createdBy.id !== guideID){
      throw new NotFoundException(`You are not authorized to update this post`);
    }

    return await this.tourPostRepository.remove(guidePost);
  }
}
