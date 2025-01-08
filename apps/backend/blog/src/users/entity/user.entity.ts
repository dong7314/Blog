import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Post } from 'src/post/entity/post.entity';
import { Like } from 'src/like/entity/like.entity';
import { Follow } from 'src/follow/entity/follow.entity';
import { Series } from 'src/series/entity/series.entity';
import { Comment } from 'src/comment/entity/comment.entity';
import { UserStatusEnum } from './enum/user.status.enum';
import { UserAuthorityEntity } from './user.authority.entity';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 30 })
  name: string;

  @Column({ length: 200 })
  description: string;

  @Column({ length: 60 })
  email: string;

  @Column({ length: 200 })
  password: string;

  @Column()
  thumbnail: string;

  @OneToMany(
    (type) => UserAuthorityEntity,
    (userAuthority) => userAuthority.user,
    { eager: true },
  )
  authorities?: any[];

  @Column({
    type: 'enum',
    enum: UserStatusEnum,
    default: UserStatusEnum.DISABLED,
  })
  status: UserStatusEnum;

  @Column({ length: 60, name: 'signup_verify_token' })
  signupVerifyToken: string;

  @OneToMany(() => Follow, (follow) => follow.follower, { eager: true })
  following: Follow[];

  @OneToMany(() => Follow, (follow) => follow.following, { eager: true })
  followers: Follow[];

  @OneToMany(() => Post, (post) => post.author)
  posts: Post[];

  @OneToMany(() => Like, (like) => like.user)
  likes: Like[];

  @OneToMany(() => Comment, (comment) => comment.author)
  comments: Comment[];

  @OneToMany(() => Series, (series) => series.author)
  series: Series[];
}
