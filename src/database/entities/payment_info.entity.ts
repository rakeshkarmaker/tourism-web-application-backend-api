
import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
import { BOOKING_INFO } from './booking_info.entity';


@Entity()
export class PAYMENT_INFO{
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(()=> BOOKING_INFO)
  @JoinColumn({'name': 'booking_id'})
  booking_id: number;

  @Column()
  payment_method: string;

  @Column()
  amount: number;

  @Column()
  status: string;

  @Column()
  transaction_no: string;
}