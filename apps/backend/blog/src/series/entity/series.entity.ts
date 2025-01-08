import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';

import { Post } from 'src/post/entity/post.entity';
import { UserEntity } from 'src/users/entity/user.entity';

@Entity()
export class Series {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  title: string;

  @Column({ nullable: true, length: 200 })
  description?: string;

  @ManyToOne(() => UserEntity, (user) => user.series, { onDelete: 'CASCADE' })
  author: UserEntity;

  @OneToMany(() => Post, (post) => post.series)
  posts: Post[];

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;
}
