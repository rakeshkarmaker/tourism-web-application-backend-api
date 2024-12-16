
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';


@Entity()
export class TRANSPORT_INFO{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: string;

  @Column()
  price_per_seat: number;

  @Column()
  capacity: number;
}