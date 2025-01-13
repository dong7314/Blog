import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';

import { AuthGuard } from 'src/guard/auth.guard';
import { JwtService } from '@nestjs/jwt';
import { CommentService } from './comment.service';

import { CommentDto } from './dto/comment.dto';
import { CommentDao } from './dao/comment.dao';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { CustomCommentDao } from './dao/custom-comment.dao';

@Controller('api.comment')
export class CommentController {
  constructor(
    private readonly jwtService: JwtService,
    private readonly commentService: CommentService,
  ) {}

  @Get('/:postId/comments')
  getComments(
    @Param('postId') postId: number,
    @Req() req: any,
  ): Promise<CustomCommentDao> {
    const userId = this.getUserId(req);
    return this.commentService.getCommentsByPost(postId, userId);
  }

  @Post('/:postId/comments')
  @UseGuards(AuthGuard)
  createComment(
    @Param('postId') postId: number,
    @Body() data: CommentDto,
    @Req() req,
  ): Promise<CommentDao> {
    const userId = this.getUserId(req);

    return this.commentService.createComment(
      postId,
      data.content,
      userId,
      data.isSecret,
      data.parentId,
    );
  }

  @Put('/comments/:commentId')
  updateComment(
    @Param('commentId') commentId: number,
    @Body() data: UpdateCommentDto,
    @Req() req,
  ): Promise<CommentDao> {
    const userId = this.getUserId(req);
    return this.commentService.updateComment(commentId, data, userId);
  }

  @Delete('/comments/:commentId')
  @UseGuards(AuthGuard)
  deleteComment(@Param('commentId') commentId: number, @Req() req: any) {
    const userId = this.getUserId(req);
    return this.commentService.deleteComment(commentId, userId);
  }

  getUserId(req: Request) {
    const token = req.headers.authorization?.split(' ')[1];
    const decoded = this.jwtService.decode(token) as { id: number };

    return decoded?.id;
  }
}
