import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  Unique,
} from 'typeorm';
import { USER_INFO } from './user_info.entity';
import { GUIDE_POST } from './tour_post.entity';

@Entity()
@Unique(['user', 'guidePost']) // Composite unique constraint - A user Can only write one review for a tour post
export class Review {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  content: string; // Review content

  @Column({ type: 'decimal', precision: 2, scale: 1 })
  rating: number; // Review rating

  @ManyToOne(() => GUIDE_POST, (guidePost) => guidePost.reviews)
  guidePost: GUIDE_POST; // Associated tour post

  @ManyToOne(() => USER_INFO, (user) => user.reviews)
  user: USER_INFO; // User who wrote the review

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
