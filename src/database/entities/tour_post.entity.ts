import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { USER_INFO } from './user_info.entity';
import { Review } from './tour_post_review.entity';

@Entity()
export class GUIDE_POST {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 200 })
  title: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'text', nullable: true })
  activities: string; // List of activities

  @Column({ type: 'text', nullable: true })
  included: string; // What is included

  @Column({ type: 'text', nullable: true })
  notIncluded: string; // What is not included

  @Column({ type: 'text', nullable: true })
  details: string; // Detailed information

  @Column({ length: 255, nullable: true })
  meetingAddress: string; // Address for meeting point

  @Column({ type: 'text', nullable: true })
  googleMapLink: string; // Google Maps link

  @Column({ type: 'decimal', precision: 2, scale: 1, default: 0 })
  averageReview: number; // Calculated average review score

  @OneToMany(() => Review, (review) => review.guidePost)
  reviews: Review[]; // List of reviews

  @Column('simple-array', { nullable: true })
  images: string[]; // List of image paths or URLs

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => USER_INFO, (user) => user.tourPosts)
  createdBy: USER_INFO; // The user who created the tour post
}
