import { Expose } from 'class-transformer';

export class UserDao {
  @Expose()
  id: number;
  @Expose()
  name: string;
  @Expose()
  email: string;
  @Expose()
  thumbnail: string;
}
