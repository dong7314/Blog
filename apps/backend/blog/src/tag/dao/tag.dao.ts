import { Expose } from 'class-transformer';

export class TagDao {
  @Expose()
  id: number;

  @Expose()
  name: string;
}
