import { Controller, Post, Param, Req, UseGuards, Get } from '@nestjs/common';
import { Request } from 'express';

import { LikeDao } from './dao/like.dao';
import { AuthGuard } from 'src/guard/auth.guard';
import { JwtService } from '@nestjs/jwt';
import { LikeService } from './like.service';

@Controller('api.like')
export class LikeController {
  constructor(
    private readonly jwtService: JwtService,
    private readonly likeService: LikeService,
  ) {}

  @Post(':postId')
  @UseGuards(AuthGuard)
  async toggleLike(@Param('postId') postId: string, @Req() req: Request) {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = this.jwtService.decode(token) as { id: number };

    if (!decoded || !decoded.id) {
      throw new Error('토큰이 유효하지 않습니다.');
    }

    const userId = decoded.id;

    return this.likeService.toggleLike(parseInt(postId), userId);
  }

  @Get(':postId')
  async getPostLikes(@Param('postId') postId: number): Promise<LikeDao[]> {
    return this.likeService.getPostLikes(postId);
  }
}
