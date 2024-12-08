import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserAuthorityEnum } from "./enum/user.authority.enum";
import { UserEntity } from "./user.entity";

@Entity('user_authority')
export class UserAuthorityEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'user_id' })
  userId: number;

  @Column({
    type: 'enum',
    enum: UserAuthorityEnum,
  })
  authority: UserAuthorityEnum

  @ManyToOne(type => UserEntity, user => user.authorities, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: UserEntity
}