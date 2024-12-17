
//v1.5.0 - Tour Profile Feature added

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { USER_INFO } from '../database/entities/user_info.entity';
import {  EditProfileDto } from './dto/edit-profile.dto';
import {  ViewProfileDto } from './dto/view-profile.dto';

@Injectable() 
export class TourProfileService {
  constructor(
    @InjectRepository(USER_INFO)
    private readonly userRepository: Repository<USER_INFO>,
  ) {}

  //v1.5.0 -Fetching the Profile
    async getTourProfile(userId: number): Promise<ViewProfileDto> {
    const user = await this.userRepository.findOne({where: { id: userId }});

    if (!user) { //user existance check
      throw new NotFoundException(`Tour Guide with ID ${userId} not found.`);
    }

    // Return user data to ViewTourProfileDto
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      phone_no: user.phone_no,
      address: user.address,
      dob: user.dob,
      gender: user.gender,
      profile_pic_path: user.profile_pic_path,
      description: user.description,
    };
  }

  //v1.5.0 - Updating Tour Guide Profile
  async updateTourProfile(userId: number, editProfileDto: EditProfileDto): Promise<{ message: string }> {
    const user = await this.userRepository.findOne({ where: { id: userId } });

    if (!user) {
      throw new NotFoundException(`Tour Guide with ID ${userId} not found.`);
    }

    // Update only provided fields
    Object.assign(user, editProfileDto);
    await this.userRepository.save(user);

    return { message: 'Tour profile updated successfully.' };
  }
}
