import { Controller, Post, Delete, Param, Get } from '@nestjs/common';
import { FollowService } from './follow.service';

@Controller('api.follow')
export class FollowController {
  constructor(private readonly followService: FollowService) {}

  @Post(':followerId/:followingId')
  async followUser(
    @Param('followerId') followerId: number,
    @Param('followingId') followingId: number,
  ): Promise<void> {
    return this.followService.followUser(followerId, followingId);
  }

  @Delete(':followerId/:followingId')
  async unfollowUser(
    @Param('followerId') followerId: number,
    @Param('followingId') followingId: number,
  ): Promise<void> {
    return this.followService.unfollowUser(followerId, followingId);
  }

  @Get('followers/:userId')
  async getFollowers(@Param('userId') userId: number) {
    return this.followService.getFollowers(userId);
  }

  @Get('following/:userId')
  async getFollowing(@Param('userId') userId: number) {
    return this.followService.getFollowing(userId);
  }
}
