import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { USER_INFO } from './user_info.entity';

@Entity()
export class TRANSACTION {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => USER_INFO)
  @JoinColumn({ name: 'user_id' })
  user_id: number;

  @Column()
  transaction_type: string; // e.g., 'income', 'withdrawal'

  @Column()
  amount: number;

  @Column()
  description: string; // Additional details, e.g., "Tour booking income" or "Withdrawal request"

  @Column()
  transaction_date: Date;

  @Column()
  status: string; // e.g., 'pending', 'completed', 'failed'
}
