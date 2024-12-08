import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UserStatusEnum } from './enum/user.status.enum';
import { UserAuthorityEntity } from './user.authority.entity';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 30 })
  name: string;

  @Column({ length: 60 })
  email: string;

  @Column({ length: 200 })
  password: string;

  @OneToMany(type => UserAuthorityEntity, userAuthority => userAuthority.user, { eager: true })
  authorities?: any[];

  @Column({
    type: 'enum',
    enum: UserStatusEnum,
    default: UserStatusEnum.DISABLED
  })
  status: UserStatusEnum;

  @Column({ length: 60, name: 'signup_verify_token' })
  signupVerifyToken: string;
}