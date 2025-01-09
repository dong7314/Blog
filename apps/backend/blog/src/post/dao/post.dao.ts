import { Expose, Type } from 'class-transformer';

import { Tag } from 'src/tag/entity/tag.entity';
import { Series } from 'src/series/entity/series.entity';
import { UserDao } from 'src/users/dao/user.dao';
import { LikeDao } from 'src/like/dao/like.dao';
import { TagDao } from 'src/tag/dao/tag.dao';

export class PostDao {
  @Expose()
  id: number;

  @Expose()
  title: string;

  @Expose()
  description: string;

  @Expose()
  content: string;

  @Type(() => UserDao)
  @Expose()
  author: UserDao;

  @Type(() => TagDao)
  @Expose()
  tags: TagDao[];

  @Expose()
  @Type(() => LikeDao)
  likes: LikeDao[];

  @Expose()
  series: Series;

  @Expose()
  createdDate: Date;

  @Expose()
  updatedDate: Date;
}
