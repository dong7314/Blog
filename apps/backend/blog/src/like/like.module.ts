import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Post } from 'src/post/entity/post.entity';
import { Like } from 'src/like/entity/like.entity';
import { UserEntity } from 'src/users/entity/user.entity';
import { JwtService } from '@nestjs/jwt';
import { LikeService } from './like.service';
import { LikeController } from './like.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Post, UserEntity, Like])],
  providers: [LikeService, JwtService],
  controllers: [LikeController],
})
export class LikeModule {}
