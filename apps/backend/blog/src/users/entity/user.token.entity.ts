import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from "./user.entity";

@Entity('user_token')
export class UserTokenEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'user_id' })
  userId: number;

  @Column({ nullable: true, name: 'current_refresh_token' })
  currentRefreshToken: string;

  @Column({ nullable: true, type: 'datetime', name: 'current_refresh_token_exp' })
  currentRefreshTokenExp: Date;

  @OneToOne(type => UserEntity, user => user.authorities, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: UserEntity
}