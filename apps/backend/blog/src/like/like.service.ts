import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Like } from './entity/like.entity';
import { Post } from 'src/post/entity/post.entity';
import { LikeDao } from './dao/like.dao';
import { UserEntity } from 'src/users/entity/user.entity';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class LikeService {
  constructor(
    @InjectRepository(Like)
    private readonly likeRepository: Repository<Like>,

    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,

    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async toggleLike(postId: number, userId: number): Promise<LikeDao[]> {
    // 게시물이 존재하는지 확인
    const post = await this.postRepository.findOne({ where: { id: postId } });
    if (!post) {
      throw new NotFoundException('게시물이 존재하지 않습니다.');
    }

    // 유저가 존재하는지 확인
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('유저가 존재하지 않습니다.');
    }

    // 이미 좋아요가 있는지 확인
    const existingLike = await this.likeRepository.findOne({
      where: { post: { id: postId }, user: { id: userId } },
    });

    if (existingLike) {
      // 좋아요 취소
      await this.likeRepository.remove(existingLike);
    } else {
      // 좋아요 추가
      const newLike = this.likeRepository.create({ post, user });
      await this.likeRepository.save(newLike);
    }

    return this.getPostLikes(postId);
  }

  async getPostLikes(postId: number): Promise<LikeDao[]> {
    const likes = await this.likeRepository.find({
      where: { post: { id: postId } },
    });

    return plainToInstance(LikeDao, likes, {
      excludeExtraneousValues: true,
    });
  }
}
