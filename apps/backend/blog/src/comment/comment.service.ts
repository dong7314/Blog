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
import { CustomCommentDao } from './dao/custom-comment.dao';

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
    const post = await this.postRepository.findOne({
      where: { id: postId },
      relations: ['author'],
    });
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

      if (!parent) {
        throw new NotFoundException('부모 댓글이 존재하지 않습니다.');
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
  ): Promise<CustomCommentDao> {
    const post = await this.postRepository.findOne({
      where: { id: postId },
      relations: ['author'],
    });
    if (!post) {
      throw new NotFoundException('포스트가 존재하지 않습니다.');
    }

    const totalComments = await this.commentRepository
      .createQueryBuilder('comment')
      .where('comment.postId = :postId', { postId })
      .getCount();

    const comments = await this.commentRepository
      .createQueryBuilder('comment')
      .leftJoinAndSelect('comment.author', 'author')
      .leftJoinAndSelect('comment.replies', 'replies')
      .leftJoinAndSelect('replies.author', 'repliesAuthor')
      .where('comment.postId = :postId', { postId })
      .andWhere('comment.parent IS NULL') // 최상위 댓글만
      .orderBy('comment.createdDate', 'DESC')
      .getMany();

    const convertComment: CustomCommentDao = {
      comments: plainToInstance(
        CommentDao,
        comments.map((comment) =>
          this.mapCommentWithReplies(comment, post.author.id, userId),
        ),
        {
          excludeExtraneousValues: true,
        },
      ),
      count: totalComments,
    };

    return convertComment;
  }

  async getRepliesByComment(
    commentId: number,
    userId?: number,
  ): Promise<CustomCommentDao> {
    // 해당 댓글이 존재하는지 확인
    const comment = await this.commentRepository.findOne({
      where: { id: commentId },
      relations: ['author'],
    });

    if (!comment) {
      throw new NotFoundException('댓글이 존재하지 않습니다.');
    }

    // 해당 댓글에 대한 대댓글을 조회하는 쿼리
    const totalReplies = await this.commentRepository
      .createQueryBuilder('comment')
      .where('comment.parentId = :commentId', { commentId })
      .getCount();

    // 대댓글을 가져오기 위한 쿼리
    const replies = await this.commentRepository
      .createQueryBuilder('comment')
      .leftJoinAndSelect('comment.author', 'author') // 대댓글의 작성자
      .leftJoinAndSelect('comment.replies', 'replies') // 대댓글의 대댓글
      .leftJoinAndSelect('replies.author', 'repliesAuthor') // 대댓글의 대댓글 작성자
      .where('comment.parentId = :commentId', { commentId }) // 해당 댓글의 대댓글만 가져오기
      .orderBy('comment.createdDate', 'DESC')
      .getMany();

    const convertReplies: CustomCommentDao = {
      comments: plainToInstance(
        CommentDao,
        replies.map((reply) =>
          this.mapCommentWithReplies(reply, comment.author.id, userId),
        ),
        {
          excludeExtraneousValues: true,
        },
      ),
      count: totalReplies,
    };

    return convertReplies;
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
