import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { USER_INFO } from './user_info.entity';
import { DESTINATION_INFO } from './destination_info.entity';

// Tour Post Entity
@Entity()
export class TOUR_POST {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  title: string;

  @Column()
  description: string;

  @Column()
  image_path: string;

  @ManyToOne(() => USER_INFO)
  @JoinColumn({ name: 'user_id' })
  user_id: number;

  @ManyToOne(() => DESTINATION_INFO)
  @JoinColumn({ name: 'destination_id' })
  destination_id: number;

  @Column()
  post_date: Date;

  @Column()
  price: number;
}