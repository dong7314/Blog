import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Param,
  Body,
  UseGuards,
  Req,
  Res,
  Query,
} from '@nestjs/common';
import { Request } from 'express';

import { AuthGuard } from 'src/guard/auth.guard';

import { JwtService } from '@nestjs/jwt';
import { PostService } from './post.service';

import { PostDto } from './dto/post.dto';
import { PostDao } from './dao/post.dao';

@Controller('api.post')
export class PostController {
  constructor(
    private readonly postService: PostService,
    private readonly jwtService: JwtService,
  ) {}

  @Post()
  @UseGuards(AuthGuard)
  async createPost(@Body() data: PostDto, @Req() req): Promise<PostDao> {
    const userId = this.getUserId(req);

    return this.postService.createPost(data, userId);
  }

  @Get('popular')
  async getPostsBylPopular(
    @Query('limit') limit: string = '10',
    @Query('offset') offset: string = '0',
    @Query('period') period: 'day' | 'week' | 'month' | 'year' = 'week',
  ) {
    return this.postService.getPopularPosts(
      parseInt(limit),
      parseInt(offset),
      period,
    );
  }

  @Get('recent')
  async getPostsByRecent(
    @Query('limit') limit: string = '10',
    @Query('offset') offset: string = '0',
  ) {
    return this.postService.getRecentPosts(parseInt(limit), parseInt(offset));
  }

  @Get('followed')
  async getPostsByFollowed(
    @Query('limit') limit: string = '10',
    @Query('offset') offset: string = '0',
    @Req() req,
  ) {
    const userId = this.getUserId(req);
    return this.postService.getFollowedPosts(
      userId,
      parseInt(limit),
      parseInt(offset),
    );
  }

  @Get('by-tags')
  async getPostsByTags(
    @Query('limit') limit: number,
    @Query('offset') offset: number,
    @Query('tags') tags: string = '',
  ) {
    // "태그1,태그2" 형태
    const tagArray = tags.split(',');
    return this.postService.findPostsByTags(tagArray, limit, offset);
  }

  @Get('search')
  async getPostsBySearch(
    @Query('limit') limit: number,
    @Query('offset') offset: number,
    @Query('keyword') keyword: string = '',
  ) {
    return this.postService.findPostsBySearchKeyword(keyword, limit, offset);
  }

  @Get(':id')
  async getPostById(
    @Param('id') id: number,
    @Req() req,
    @Res() res,
  ): Promise<void> {
    await this.postService.incrementPostView(id, req, res);
    const post = await this.postService.getPostById(id);
    res.json(post);
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  async updatePost(
    @Param('id') id: number,
    @Body() data: PostDto,
    @Req() req,
  ): Promise<PostDao> {
    const userId = this.getUserId(req);

    return this.postService.updatePost(id, data, userId);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  async deletePost(@Param('id') id: number, @Req() req): Promise<void> {
    const userId = this.getUserId(req);

    return this.postService.deletePost(id, userId);
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
