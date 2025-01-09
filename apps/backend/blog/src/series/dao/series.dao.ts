import { Expose, Type } from 'class-transformer';
import { PostDao } from 'src/post/dao/post.dao';

import { UserDao } from 'src/users/dao/user.dao';

export class SeriesDao {
  @Expose()
  id: number;

  @Expose()
  title: string;

  @Expose()
  description: string;

  @Type(() => UserDao)
  @Expose()
  author: UserDao;

  @Type(() => PostDao)
  @Expose()
  posts: PostDao[];

  @Expose()
  createdDate: Date;

  @Expose()
  updatedDate: Date;
}
