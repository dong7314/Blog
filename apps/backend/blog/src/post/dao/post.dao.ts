import { Expose, Type } from 'class-transformer';

import { TagDao } from 'src/tag/dao/tag.dao';
import { UserDao } from 'src/users/dao/user.dao';
import { LikeDao } from 'src/like/dao/like.dao';
import { SeriesDao } from 'src/series/dao/series.dao';
import { CommentDao } from 'src/comment/dao/comment.dao';

export class PostDao {
  @Expose()
  id: number;

  @Expose()
  title: string;

  @Expose()
  description: string;

  @Expose()
  content: string;

  @Expose()
  thumbnail: string;

  @Type(() => UserDao)
  @Expose()
  author: UserDao;

  @Type(() => TagDao)
  @Expose()
  tags: TagDao[];

  @Type(() => LikeDao)
  @Expose()
  likes: LikeDao[];

  @Type(() => SeriesDao)
  @Expose()
  series: SeriesDao;

  @Type(() => CommentDao)
  @Expose()
  comments: CommentDao[];

  @Expose()
  seriesOrder: number;

  @Expose()
  viewCount: number;

  @Expose()
  createdDate: Date;

  @Expose()
  updatedDate: Date;
}
