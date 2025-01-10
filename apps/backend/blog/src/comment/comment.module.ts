import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Post } from 'src/post/entity/post.entity';
import { Comment } from 'src/comment/entity/comment.entity';
import { UserEntity } from 'src/users/entity/user.entity';
import { JwtService } from '@nestjs/jwt';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Post, UserEntity, Comment])],
  providers: [CommentService, JwtService],
  controllers: [CommentController],
})
export class CommentModule {}
