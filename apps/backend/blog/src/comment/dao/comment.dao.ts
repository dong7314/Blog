import { Expose, Type } from 'class-transformer';
import { PostDao } from 'src/post/dao/post.dao';

import { UserDao } from 'src/users/dao/user.dao';

export class CommentDao {
  @Expose()
  id: number;

  @Expose()
  content: string;

  @Expose()
  isSecret: boolean;

  @Type(() => UserDao)
  @Expose()
  author: UserDao;

  @Type(() => PostDao)
  @Expose()
  post: PostDao;

  @Expose()
  replies: CommentDao[];

  @Expose()
  parent: CommentDao;

  @Expose()
  createdDate: Date;

  @Expose()
  updatedDate: Date;
}
