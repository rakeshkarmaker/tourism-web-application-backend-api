
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, ManyToOne } from 'typeorm';
import { USER_INFO } from './user_info.entity';


@Entity()
export class REVIEW_INFO{
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(()=> USER_INFO)
  @JoinColumn({'name': 'user_id'})
  user_id: number;

  @ManyToOne(()=> USER_INFO)
  @JoinColumn({'name': 'target_id'})
  target_id: number;

  @ManyToOne(()=> USER_INFO)
  @JoinColumn({'name': 'target_type'})
  target_type: string;

  @Column()
  review_text: number;

  @Column()
  rating: number;
}




