import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, ManyToOne } from 'typeorm';
import { USER_INFO } from './user_info.entity';
import { PACKAGE_INFO } from './package_info.entity';
import { TRANSPORT_INFO } from './transport_info.entity';


@Entity()
export class BOOKING_INFO{
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(()=> USER_INFO)
  @JoinColumn({'name': 'user_id'})
  user_id: number;

  @ManyToOne(()=> PACKAGE_INFO)
  @JoinColumn({'name': 'package_id'})
  package_id: number;

  @ManyToOne(()=> TRANSPORT_INFO)
  @JoinColumn({'name': 'transport_id'})
  transport_id: number;

  @Column()
  booking_data: Date;

  @Column()
  status:string
}