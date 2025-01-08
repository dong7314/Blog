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
} from '@nestjs/common';

import { AuthGuard } from 'src/guard/auth.guard';

import { JwtService } from '@nestjs/jwt';
import { PostService } from './post.service';

import { PostDto } from './dto/create-post.dto';
import { Post as PostEntity } from './entity/post.entity';

@Controller('api.posts')
export class PostController {
  constructor(
    private readonly postService: PostService,
    private readonly jwtService: JwtService,
  ) {}

  @Post()
  @UseGuards(AuthGuard)
  async createPost(@Body() data: PostDto, @Req() req): Promise<PostEntity> {
    const token = req.headers.authorization.split(' ')[1]; // "Bearer {token}"에서 token 추출
    const decoded = this.jwtService.decode(token) as { userId: number };

    if (!decoded || !decoded.userId) {
      throw new Error('토큰이 유효하지 않습니다.');
    }

    const userId = decoded.userId;

    return this.postService.createPost(data, userId);
  }

  @Get(':id')
  async getPostById(@Param('id') id: number): Promise<PostEntity> {
    return this.postService.getPostById(id);
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  async updatePost(
    @Param('id') id: number,
    @Body() data: PostDto,
    @Req() req,
  ): Promise<PostEntity> {
    const token = req.headers.authorization.split(' ')[1]; // "Bearer {token}"에서 token 추출
    const decoded = this.jwtService.decode(token) as { userId: number };

    if (!decoded || !decoded.userId) {
      throw new Error('토큰이 유효하지 않습니다.');
    }

    const userId = decoded.userId;

    return this.postService.updatePost(id, data, userId);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  async deletePost(@Param('id') id: number): Promise<void> {
    return this.postService.deletePost(id);
  }
}
