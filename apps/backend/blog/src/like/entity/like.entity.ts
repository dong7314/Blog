import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

import { Post } from 'src/post/entity/post.entity';
import { UserEntity } from 'src/users/entity/user.entity';

@Entity()
export class Like {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserEntity, (user) => user.likes, { onDelete: 'CASCADE' })
  user: UserEntity;

  @ManyToOne(() => Post, (post) => post.likes, { onDelete: 'CASCADE' })
  post: Post;
}
