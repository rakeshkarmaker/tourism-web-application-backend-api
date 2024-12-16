
import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn} from 'typeorm';
import { USER_INFO } from './user_info.entity';


@Entity()
export class LOGIN_INFO{
  @PrimaryGeneratedColumn()
  @OneToOne(()=> USER_INFO)
  @JoinColumn({'name': 'user_id'})
  id: number;

  @Column({ length: 100, unique : true })
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  refreshToken: string;
}