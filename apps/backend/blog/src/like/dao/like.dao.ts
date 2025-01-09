import { Expose, Type } from 'class-transformer';

import { UserDao } from 'src/users/dao/user.dao';

export class LikeDao {
  @Expose()
  id: number;

  @Type(() => UserDao)
  @Expose()
  user: UserDao;
}
