import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Tag } from 'src/tag/entity/tag.entity';
import { Post } from './entity/post.entity';
import { Like } from 'src/like/entity/like.entity';
import { Series } from 'src/series/entity/series.entity';
import { Comment } from 'src/comment/entity/comment.entity';
import { UserEntity } from 'src/users/entity/user.entity';
import { JwtService } from '@nestjs/jwt';
import { PostService } from './post.service';
import { PostController } from './post.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Post, UserEntity, Tag, Like, Comment, Series]),
  ],
  providers: [PostService, JwtService],
  controllers: [PostController],
})
export class PostModule {}
