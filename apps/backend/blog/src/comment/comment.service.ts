import { IsNull, Not, Repository } from 'typeorm';
import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { InjectRepository } from '@nestjs/typeorm';

import { Post } from 'src/post/entity/post.entity';
import { Comment } from './entity/comment.entity';
import { UserEntity } from 'src/users/entity/user.entity';
import { CommentDao } from './dao/comment.dao';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async createComment(
    postId: number,
    content: string,
    userId: number,
    isSecret: boolean,
    parentId?: number,
  ): Promise<CommentDao> {
    // 포스트 존재 여부 확인
    const post = await this.postRepository.findOne({ where: { id: postId } });
    if (!post) {
      throw new NotFoundException('포스트가 존재하지 않습니다.');
    }

    // 사용자 존재 여부 확인
    const author = await this.userRepository.findOne({ where: { id: userId } });
    if (!author) {
      throw new NotFoundException('유저가 존재하지 않습니다.');
    }

    // 부모 댓글 확인(대댓글 작성인 경우)
    let parent: Comment | null = null;
    if (parentId) {
      parent = await this.commentRepository.findOne({
        where: { id: parentId },
      });
      console.log(parent);
      if (!parent) {
        throw new NotFoundException('부모 댓글이 존재하지 않습니다.');
      }

      // 비밀 댓글에 대댓글을 작성하려는 경우 권한 확인
      if (
        parent.isSecret &&
        !(post.author.id === userId || parent.author.id === userId)
      ) {
        throw new ForbiddenException(
          '비밀 댓글에 대댓글을 작성할 권한이 없습니다.',
        );
      }
    }

    // 댓글 저장
    const comment = this.commentRepository.create({
      content,
      isSecret,
      post,
      author,
      parent,
    });

    return plainToInstance(CommentDao, this.commentRepository.save(comment), {
      excludeExtraneousValues: true,
    });
  }

  async getCommentsByPost(
    postId: number,
    userId?: number,
  ): Promise<CommentDao[]> {
    const post = await this.postRepository.findOne({
      where: { id: postId },
      relations: ['author'],
    });
    if (!post) {
      throw new NotFoundException('포스트가 존재하지 않습니다.');
    }

    const comments = await this.commentRepository
      .createQueryBuilder('comment')
      .leftJoinAndSelect('comment.author', 'author')
      .leftJoinAndSelect('comment.replies', 'replies')
      .leftJoinAndSelect('replies.author', 'repliesAuthor')
      .leftJoinAndSelect('replies.replies', 'repliesReplies')
      .where('comment.postId = :postId', { postId })
      .andWhere('comment.parent IS NULL') // 최상위 댓글만
      .getMany();

    // 비밀 댓글 필터링 및 계층 구조 생성
    return plainToInstance(
      CommentDao,
      comments.map((comment) =>
        this.mapCommentWithReplies(comment, post.author.id, userId),
      ),
      {
        excludeExtraneousValues: true,
      },
    );
  }

  private mapCommentWithReplies(
    comment: Comment,
    postAuthorId: number,
    userId?: number,
  ): any {
    // 비밀 댓글 내용 필터링
    const filteredComment = {
      ...comment,
      content:
        comment.isSecret &&
        comment.author.id !== userId &&
        postAuthorId !== userId
          ? '비밀 댓글입니다.'
          : comment.content,
      // 대댓글 재귀 처리
      replies: comment.replies?.map((reply) =>
        this.mapCommentWithReplies(reply, postAuthorId, userId),
      ),
    };

    return plainToInstance(CommentDao, filteredComment, {
      excludeExtraneousValues: true,
    });
  }

  async updateComment(
    commentId: number,
    data: UpdateCommentDto,
    userId: number,
  ): Promise<CommentDao> {
    const comment = await this.commentRepository.findOne({
      where: { id: commentId },
      relations: ['author'],
    });
    if (!comment) {
      throw new NotFoundException('댓글이 존재하지 않습니다.');
    }

    if (comment.author.id !== userId) {
      throw new ForbiddenException('댓글을 수정할 권한이 없습니다.');
    }

    comment.content = data.content;
    comment.isSecret = data.isSecret;

    return plainToInstance(CommentDao, this.commentRepository.save(comment), {
      excludeExtraneousValues: true,
    });
  }

  async deleteComment(commentId: number, userId: number): Promise<void> {
    const comment = await this.commentRepository.findOne({
      where: { id: commentId },
      relations: ['author', 'post'],
    });
    if (!comment) {
      throw new NotFoundException('댓글이 존재하지 않습니다.');
    }

    if (comment.author.id !== userId && comment.post.author.id !== userId) {
      throw new ForbiddenException('댓글을 삭제할 권한이 없습니다.');
    }

    // 삭제 처리
    await this.commentRepository.delete(commentId);
  }
}