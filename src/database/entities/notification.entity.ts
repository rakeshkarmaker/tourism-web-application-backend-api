import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { USER_INFO } from './user_info.entity';


// Notification Entity
@Entity()
export class NOTIFICATION {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => USER_INFO)
  @JoinColumn({ name: 'receiver_id' })
  receiver_id: number;

  @Column()
  message: string;

  @Column()
  type: string; // e.g., 'booking', 'payment', 'general'

  @Column({ default: false })
  is_read: boolean;

  @Column()
  created_at: Date;
}