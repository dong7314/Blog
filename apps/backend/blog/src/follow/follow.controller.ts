import {
  Controller,
  Post,
  Delete,
  Param,
  Get,
  UseGuards,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';

import { JwtService } from '@nestjs/jwt';
import { FollowService } from './follow.service';
import { AuthGuard } from 'src/guard/auth.guard';

@Controller('api.follow')
export class FollowController {
  constructor(
    private readonly followService: FollowService,
    private jwtService: JwtService,
  ) {}

  @Post(':followerId/:followingId')
  @UseGuards(AuthGuard)
  async followUser(
    @Param('followerId') followerId: string,
    @Param('followingId') followingId: string,
    @Req() req,
  ): Promise<void> {
    const userId = this.getUserId(req);

    if (userId !== parseInt(followerId)) {
      throw new UnauthorizedException('권한이 없는 유저입니다.');
    }

    return this.followService.followUser(
      parseInt(followerId),
      parseInt(followingId),
    );
  }

  @Delete(':followerId/:followingId')
  @UseGuards(AuthGuard)
  async unfollowUser(
    @Param('followerId') followerId: string,
    @Param('followingId') followingId: string,
    @Req() req,
  ): Promise<void> {
    const userId = this.getUserId(req);

    if (userId !== parseInt(followerId)) {
      throw new UnauthorizedException('권한이 없는 유저입니다.');
    }

    return this.followService.unfollowUser(
      parseInt(followerId),
      parseInt(followingId),
    );
  }

  @Get('followers/:userId')
  async getFollowers(@Param('userId') userId: number) {
    return this.followService.getFollowers(userId);
  }

  @Get('following/:userId')
  async getFollowing(@Param('userId') userId: number) {
    return this.followService.getFollowing(userId);
  }

  getUserId(req: Request) {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = this.jwtService.decode(token) as { id: number };

    if (!decoded || !decoded.id) {
      throw new Error('토큰이 유효하지 않습니다.');
    }

    return decoded.id;
  }
}
