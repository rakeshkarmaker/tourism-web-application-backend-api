
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';



@Entity()
export class DESTINATION_INFO{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  best_season: string;

  @Column()
  popularity_score: number;
}
