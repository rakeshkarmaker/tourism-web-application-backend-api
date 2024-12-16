
import { Entity, Column, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export class USER_INFO{
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100})
  name: string;

  @Column({ length: 100, unique : true })
  email: string;

  @Column()
  phone_no: number;

  @Column()
  address: string;

  @Column()
  dob: Date;

  @Column()
  gender: string;

  @Column()
  nid_no: number;

  @Column()
  nid_pic_path: string;

  @Column()
  profile_pic_path: string;

  @Column()
  description:string;

  @Column()
  user_type: string;
}