
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, ManyToOne } from 'typeorm';
import { AGENCY_INFO } from './agency_info.entity';


@Entity()
export class PACKAGE_INFO{
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100})
  name: string;

  @Column()
  description: string;

  @Column()
  price:number;

  @ManyToOne(()=> AGENCY_INFO)
  @JoinColumn({'name': 'agency_id'})
  agency_id: number;
}