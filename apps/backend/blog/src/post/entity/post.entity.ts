import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  ManyToMany,
  JoinTable,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

import { Tag } from 'src/tag/entity/tag.entity';
import { Like } from 'src/like/entity/like.entity';
import { Series } from 'src/series/entity/series.entity';
import { Comment } from 'src/comment/entity/comment.entity';
import { UserEntity } from 'src/users/entity/user.entity';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  title: string;

  @Column({ nullable: true, length: 150 })
  description?: string;

  @Column()
  content: string;

  @ManyToOne(() => UserEntity, (user) => user.posts, { onDelete: 'CASCADE' })
  author: UserEntity;

  @ManyToMany(() => Tag, { cascade: true })
  @JoinTable()
  tags: Tag[];

  @OneToMany(() => Like, (like) => like.post)
  likes: Like[];

  @OneToMany(() => Comment, (comment) => comment.post)
  comments: Comment[];

  @Column({ nullable: true })
  thumbnail?: string;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;

  @ManyToOne(() => Series, (series) => series.posts, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  series: Series;

  @Column({ nullable: true })
  seriesOrder: number;
}
