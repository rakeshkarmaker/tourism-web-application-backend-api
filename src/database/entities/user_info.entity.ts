
import { Entity, Column, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export class USER_INFO{
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100})
  name: string;

  @Column({ length: 100, unique : true })
  email: string;

  @Column({ type: 'varchar', length: 15 })
  phone_no: string; // V1.1.2 - Using string to handle leading to zeros

  @Column({ length: 255 }) // V1.1.2 - setting a limitation of size to the address
  address: string;

  @Column({ type: 'date' }) // V1.1.2 - Setting the type to date ( Keep as Date for date-based operations)
  dob: Date;

  @Column({ type: 'enum', enum: ['Male', 'Female', 'Other'] }) // V1.1.2 -for genders- using enumeration to restrict possible values to only valid one.
  gender: string;

  @Column({ type: 'varchar', length: 20 })// V1.1.2 - limiting lengths
  nid_no: string;

  @Column({ length: 255 })// V1.1.2 - limiting lengths
  nid_pic_path: string;

  @Column({ length: 255 })// V1.1.2 - limiting lengths
  profile_pic_path: string;

  @Column({ type: 'text', nullable: true })// V1.1.2 - limiting lengths
  description:string;

  @Column({ type: 'enum', enum: ['User', 'Admin', 'TourAgency','TourGuide'] }) // V1.1.2 - By using enum, limiting the values
  user_type: string;
}