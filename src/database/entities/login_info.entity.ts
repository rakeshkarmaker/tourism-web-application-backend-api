
import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn} from 'typeorm';
import { USER_INFO } from './user_info.entity';


@Entity()
export class LOGIN_INFO{
  @PrimaryGeneratedColumn()
  id: number; // Primary key for LOGIN_INFO table

  @OneToOne(() => USER_INFO) // One-to-One relationship with USER_INFO
  @JoinColumn({ name: 'user_id' }) // Defining the foreign key column
  user: USER_INFO; // Represents the relationship with USER_INFO
  
  @Column({ length: 100, unique : true })
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  refreshToken: string;

  @Column({ nullable: true }) 
  refTokenExpDate: Date;

  //v1.3.1- Forget Password entity update
  @Column({ nullable: true })
  resetToken: string;

  @Column({ nullable: true }) 
  resetTokenExpDate: Date;
  
}