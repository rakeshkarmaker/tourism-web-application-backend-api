import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { USER_INFO } from './user_info.entity';



// Message Entity
@Entity()
export class MESSAGE {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => USER_INFO)
  @JoinColumn({ name: 'sender_id' })
  sender_id: number;

  @ManyToOne(() => USER_INFO)
  @JoinColumn({ name: 'receiver_id' })
  receiver_id: number;

  @Column()
  content: string;

  @Column()
  sent_at: Date;
}