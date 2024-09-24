import { Exclude } from 'class-transformer';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ name: 'first_name', type: 'varchar', length: 30, nullable: true })
  firstName: string;

  @Column({ name: 'middle_name', type: 'varchar', length: 30, nullable: true })
  middleName: string;

  @Column({ name: 'last_name', type: 'varchar', length: 30, nullable: true })
  lastName: string;

  @Column({ name: 'father_name', type: 'varchar', length: 200, nullable: true })
  fatherName: string;

  @Column({ name: 'mobile_alt', type: 'bigint', nullable: true })
  mobileAlt: number;

  @Column({ name: 'username', type: 'varchar', length: 50, nullable: true })
  username: string;

  @Column({ name: 'dob', type: 'varchar', length: 10, default: '00-00-0000' })
  dob: string;

  @Column({ name: 'gender', type: 'enum', enum: ['Male', 'Female', 'Others', ''], nullable: true })
  gender: string;

  @Column({ name: 'mobile_primary', type: 'varchar', length: 20, nullable: true })
  mobilePrimary: string;

  @Column({ name: 'mobile_wa', type: 'bigint', nullable: true })
  mobileWa: number;

  @Column({ name: 'mobile_office1', type: 'bigint', nullable: true })
  mobileOffice1: number;

  @Column({ name: 'phone1', type: 'bigint', nullable: true })
  phone1: number;

  @Column({ name: 'phone2', type: 'bigint', nullable: true })
  phone2: number;

  @Column({ name: 'email', type: 'varchar', length: 50, nullable: true })
  email: string;

  @Exclude()
  @Column({ name: 'password', type: 'text', nullable: true })
  password: string;

  @Column({ name: 'user_profile_pic', type: 'text', nullable: true })
  userProfilePic: string;

  @Column({ name: 'user_cover_image', type: 'text', nullable: true })
  userCoverImage: string;

  @Column({ name: 'qualification_id', type: 'int', nullable: true })
  qualificationId: number;

  @Column({ name: 'profession_id', type: 'int', nullable: true })
  professionId: number;

  @Column({ name: 'user_address', type: 'varchar', length: 200, nullable: true })
  userAddress: string;

  @Column({ name: 'address_pincode', type: 'int', nullable: true })
  addressPincode: number;

  @Column({ name: 'address_state_id', type: 'int', nullable: true })
  addressStateId: number;

  @Column({ name: 'address_city_id', type: 'int', nullable: true })
  addressCityId: number;

  @Column({ name: 'elct_pc_id', type: 'int', nullable: true })
  elctPcId: number;

  @Column({ name: 'elct_state_id', type: 'int', nullable: true })
  elctStateId: number;

  @Column({ name: 'elct_ac_id', type: 'int', nullable: true })
  elctAcId: number;

  @Column({ name: 'elct_ward_id', type: 'int', nullable: true })
  elctWardId: number;

  @Column({ name: 'elct_pb_id', type: 'int', nullable: true })
  elctPbId: number;

  @Column({ name: 'lang_id', type: 'int', nullable: true })
  langId: number;

  @Column({ name: 'religion_id', type: 'int', nullable: true })
  religionId: number;

  @Column({ name: 'is_volunteer', type: 'tinyint', default: 0 })
  isVolunteer: number;

  @Column({ name: 'user_booth_worker_id', type: 'int', nullable: true })
  userBoothWorkerId: number;

  @Column({ name: 'is_leader', type: 'tinyint', default: 0 })
  isLeader: number;

  @Column({ name: 'email_verified', type: 'tinyint', width: 1, default: 0 })
  emailVerified: number;

  @Column({ name: 'is_onboarded', type: 'tinyint', width: 1, default: 0 })
  isOnboarded: number;

  @Column({ name: 'social_login_method', type: 'text', nullable: true })
  socialLoginMethod: string;

  @Column({ name: 'online_lang_id', type: 'int', default: 29 })
  onlineLangId: number;

  @Column({
    name: 'account_status',
    type: 'int',
    default: 1,
    comment: '0=inactive, 1=active, 2=suspended, 3=blocked',
  })
  accountStatus: number;

  @Column({
    name: 'remarks',
    type: 'text',
    nullable: true,
    comment: 'if account status is blocked write reason',
  })
  remarks: string;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp', onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;
}
