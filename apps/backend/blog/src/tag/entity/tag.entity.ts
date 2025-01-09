import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';

import { Post } from 'src/post/entity/post.entity';

@Entity()
export class Tag {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @ManyToMany(() => Post, (post) => post.tags)
  posts: Tag[];
}
