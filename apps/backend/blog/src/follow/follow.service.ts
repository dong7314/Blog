import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { Repository } from 'typeorm';

import { Follow } from './entity/follow.entity';
import { UserDao } from './dao/user.dao';
import { UserEntity } from 'src/users/entity/user.entity';

@Injectable()
export class FollowService {
  constructor(
    @InjectRepository(Follow)
    private followRepository: Repository<Follow>,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async followUser(followerId: number, followingId: number): Promise<void> {
    if (followerId === followingId) {
      throw new Error("You can't follow yourself");
    }

    const follower = await this.userRepository.findOne({
      where: { id: followerId },
    });
    const following = await this.userRepository.findOne({
      where: { id: followingId },
    });

    if (!follower || !following) {
      throw new NotFoundException('유저가 존재하지 않습니다.');
    }

    const existingFollow = await this.followRepository.findOne({
      where: { follower, following },
    });

    if (existingFollow) {
      throw new Error('이미 팔로우가 되어 있는 유저입니다.');
    }

    const follow = this.followRepository.create({ follower, following });
    await this.followRepository.save(follow);
  }

  async unfollowUser(followerId: number, followingId: number): Promise<void> {
    const follow = await this.followRepository.findOne({
      where: { follower: { id: followerId }, following: { id: followingId } },
    });

    if (!follow) {
      throw new NotFoundException('팔로우 관계가 존재하지 않습니다.');
    }

    await this.followRepository.remove(follow);
  }

  async getFollowers(userId: number): Promise<UserEntity[]> {
    const followers = await this.followRepository.find({
      where: { following: { id: userId } },
      relations: ['follower'],
    });
    return followers.map((follow) => follow.follower);
  }

  async getFollowing(userId: number): Promise<UserDao[]> {
    const following = await this.followRepository.find({
      where: { follower: { id: userId } },
      relations: ['following'],
    });
    return plainToInstance(
      UserDao,
      following.map((follow) => follow.following),
      { excludeExtraneousValues: true },
    );
  }
}
