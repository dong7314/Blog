import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { In, Repository } from 'typeorm';
import { plainToInstance } from 'class-transformer';
import { InjectRepository } from '@nestjs/typeorm';
import { Request, Response } from 'express';

import { Tag } from 'src/tag/entity/tag.entity';
import { Post } from './entity/post.entity';
import { Series } from 'src/series/entity/series.entity';
import { PostDto } from './dto/post.dto';
import { PostDao } from './dao/post.dao';
import { UserEntity } from 'src/users/entity/user.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
    @InjectRepository(Tag)
    private tagRepository: Repository<Tag>,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    @InjectRepository(Series)
    private seriesRepository: Repository<Series>,
  ) {}

  async createPost(data: PostDto, userId: number): Promise<PostDao> {
    // author 처리
    const author = await this.userRepository.findOne({ where: { id: userId } });
    if (!author) {
      throw new NotFoundException('유저가 존재하지 않습니다.');
    }

    // tag 처리
    const tags: Tag[] = await this.updateTag(data.tags);

    // 시리즈 처리
    let series: Series | null = null;
    if (data.seriesId) {
      series = await this.seriesRepository.findOne({
        where: { id: data.seriesId },
        relations: ['posts'],
      });
      if (!series) {
        throw new NotFoundException('시리즈가 존재하지 않습니다.');
      }

      if (series.author.id !== userId) {
        throw new ConflictException('유저의 시리즈가 아닙니다.');
      }
    }

    // 포스트 생성
    const post = new Post();
    post.author = author;
    post.title = data.title;
    post.description = data.description;
    post.content = data.content;
    post.tags = tags;
    post.thumbnail = data.thumbnail;
    post.series = series;

    // 시리즈 내 순서 지정
    if (series) {
      const maxOrder =
        series.posts.length > 0
          ? Math.max(...series.posts.map((p) => p.seriesOrder || 0))
          : 0;
      post.seriesOrder = maxOrder + 1;
    }

    return plainToInstance(PostDao, this.postRepository.save(post), {
      excludeExtraneousValues: true,
    });
  }

  async getPostById(postId: number): Promise<PostDao> {
    const post = this.postRepository.findOne({
      where: { id: postId },
      relations: ['author', 'tags', 'likes', 'comments', 'series'],
    });

    if (!post) {
      throw new NotFoundException('포스트가 존재하지 않습니다.');
    }

    return plainToInstance(PostDao, post, { excludeExtraneousValues: true });
  }

  async updatePost(
    postId: number,
    data: PostDto,
    userId: number,
  ): Promise<PostDao> {
    const post: Post = await this.postRepository.findOne({
      where: { id: postId },
      relations: ['author', 'series'],
    });
    if (!post) {
      throw new NotFoundException('포스트가 존재하지 않습니다.');
    }
    if (post.author.id !== userId) {
      throw new UnauthorizedException('포스트를 수정할 권한이 없습니다.');
    }

    // 태그 업데이트
    if (data.tags) {
      post.tags = await this.updateTag(data.tags);
    }

    // 시리즈는 현재 시리즈의 아이디와 비교. 시리즈 아이디가 달라질 경우 업데이트 진행
    if (data.seriesId !== undefined) {
      if (!post.series || (post.series && post.series.id !== data.seriesId)) {
        const series: Series = await this.seriesRepository.findOne({
          where: { id: data.seriesId },
          relations: ['posts', 'author'],
        });
        if (!series) {
          throw new NotFoundException('시리즈가 존재하지 않습니다.');
        }

        if (series.author.id !== userId) {
          throw new ConflictException('유저의 시리즈가 아닙니다.');
        }
        post.series = series;

        // 시리즈 내 순서 업데이트
        if (!post.seriesOrder) {
          const maxOrder =
            series.posts.length > 0
              ? Math.max(...series.posts.map((p) => p.seriesOrder || 0))
              : -1;
          post.seriesOrder = maxOrder + 1;
        }
      }
    } else {
      post.series = null;
      post.seriesOrder = null;
    }

    post.title = data.title;
    post.description = data.description;
    post.content = data.content;
    post.thumbnail = data.thumbnail;

    return plainToInstance(PostDao, this.postRepository.save(post), {
      excludeExtraneousValues: true,
    });
  }

  async deletePost(postId: number, userId: number): Promise<void> {
    const post = await this.postRepository.findOne({
      where: { id: postId },
      relations: ['author', 'series'],
    });

    if (post.author.id !== userId) {
      throw new UnauthorizedException('포스트를 삭제할 권한이 없습니다.');
    }

    await this.postRepository.delete(postId);
  }

  async updateTag(dataTags: string[]): Promise<Tag[]> {
    let tags = [];
    if (dataTags && dataTags.length > 0) {
      tags = await Promise.all(
        dataTags.map(async (tagName) => {
          // 태그가 존재하는지 확인
          let tag = await this.tagRepository.findOne({
            where: { name: tagName },
          });
          if (!tag) {
            // 태그가 없으면 생성
            tag = this.tagRepository.create({ name: tagName });
            tag = await this.tagRepository.save(tag);
          }
          return tag;
        }),
      );
    }

    return tags;
  }

  async incrementPostView(
    postId: number,
    req: Request,
    res: Response,
  ): Promise<void> {
    const cookieName = `viewed_post_${postId}`;
    const viewed = req.cookies[cookieName];

    if (viewed) {
      return; // 이미 조회한 경우
    }

    // 조회 수 증가
    const post = await this.postRepository.findOne({ where: { id: postId } });
    if (!post) {
      throw new NotFoundException('게시글을 찾을 수 없습니다.');
    }
    post.viewCount++;
    await this.postRepository.save(post);

    // 쿠키에 기록 (1시간 동안 유지)
    res.cookie(cookieName, true, { maxAge: 3600000, httpOnly: true });
  }

  // 인기 순 조회
  async getPopularPosts(
    limit: number,
    offset: number,
    period: 'day' | 'week' | 'month' | 'year',
  ): Promise<PostDao[]> {
    return this.findPostsByPopular(limit, offset, period);
  }

  // 최신 순 조회
  async getRecentPosts(limit: number, offset: number): Promise<PostDao[]> {
    return this.findPostsByRecent(limit, offset);
  }

  // 팔로우 포스트 조회
  async getFollowedPosts(
    userId: number,
    limit: number,
    offset: number,
  ): Promise<PostDao[]> {
    return this.findPostsByFollowedUsers(userId, limit, offset);
  }

  // 인기 순 조회
  async findPostsByPopular(
    limit: number,
    offset: number,
    period: 'day' | 'week' | 'month' | 'year',
  ): Promise<PostDao[]> {
    const query = this.postRepository
      .createQueryBuilder('post')
      .leftJoinAndSelect('post.author', 'author')
      .leftJoinAndSelect('post.tags', 'tags')
      .leftJoinAndSelect('post.likes', 'likes')
      .leftJoinAndSelect('post.comments', 'comments')
      .orderBy('popularity', 'DESC')
      .take(limit)
      .skip(offset * limit);

    // 기간 필터링
    if (period) {
      const startDate = this.getStartDateForPeriod(period);
      query.andWhere('post.createdDate >= :startDate', { startDate });
    }

    // 가중치 기반 인기 정렬
    query.addSelect('COUNT(likes.id) * 2 + post.viewCount', 'popularity');
    // GROUP BY에 필요한 모든 컬럼 추가
    query.groupBy('post.id, author.id, tags.id, comments.id, likes.id');

    const results = await query.getMany();

    return plainToInstance(PostDao, results, {
      excludeExtraneousValues: true,
    });
  }

  // 최신 순 조회
  async findPostsByRecent(limit: number, offset: number): Promise<PostDao[]> {
    const results = await this.postRepository
      .createQueryBuilder('post')
      .leftJoinAndSelect('post.author', 'author')
      .leftJoinAndSelect('post.tags', 'tags')
      .leftJoinAndSelect('post.likes', 'likes')
      .leftJoinAndSelect('post.comments', 'comments')
      .orderBy('post.createdDate', 'DESC')
      .take(limit)
      .skip(offset * limit)
      .getMany();

    return plainToInstance(PostDao, results, {
      excludeExtraneousValues: true,
    });
  }

  // 팔로우한 사용자의 포스트 조회
  async findPostsByFollowedUsers(
    userId: number,
    limit: number,
    offset: number,
  ): Promise<PostDao[]> {
    const results = await this.postRepository
      .createQueryBuilder('post')
      .leftJoinAndSelect('post.author', 'author')
      .leftJoinAndSelect('post.tags', 'tags')
      .leftJoinAndSelect('post.likes', 'likes')
      .leftJoinAndSelect('post.comments', 'comments')
      .leftJoin('author.followers', 'followers')
      .where('followers.id = :userId', { userId })
      .orderBy('post.createdDate', 'DESC')
      .take(limit)
      .skip(offset * limit)
      .getMany();

    return plainToInstance(PostDao, results, {
      excludeExtraneousValues: true,
    });
  }

  // 태그 포함 조회
  async findPostsByTags(
    tags: string[],
    limit: number,
    offset: number,
  ): Promise<PostDao[]> {
    if (!tags || tags.length === 0) {
      throw new Error('Tags array must not be empty.');
    }

    const query = this.postRepository
      .createQueryBuilder('post')
      .leftJoinAndSelect('post.author', 'author')
      .leftJoinAndSelect('post.tags', 'tags') // 모든 태그를 가져옴
      .leftJoinAndSelect('post.likes', 'likes')
      .where((qb) => {
        const subQuery = qb
          .subQuery()
          .select('post.id')
          .from('post', 'post')
          .leftJoin('post.tags', 'tags')
          .where('tags.name IN (:...tagNames)', { tagNames: tags })
          .groupBy('post.id')
          .getQuery();
        return `post.id IN ${subQuery}`;
      })
      .orderBy('post.createdDate', 'DESC')
      .take(limit)
      .skip(offset * limit);

    const results = await query.getMany();

    return plainToInstance(PostDao, results, {
      excludeExtraneousValues: true,
    });
  }

  async findPostsBySearchKeyword(
    keyword: string,
    limit: number,
    offset: number,
  ): Promise<PostDao[]> {
    const query = this.postRepository
      .createQueryBuilder('post')
      .leftJoinAndSelect('post.author', 'author')
      .leftJoinAndSelect('post.tags', 'tags')
      .leftJoinAndSelect('post.likes', 'likes')
      .where('post.title LIKE :keyword', { keyword: `%${keyword}%` })
      .orWhere('post.content LIKE :keyword', { keyword: `%${keyword}%` })
      .orderBy('post.createdDate', 'DESC')
      .take(limit)
      .skip(offset * limit);

    const results = await query.getMany();

    return plainToInstance(PostDao, results, {
      excludeExtraneousValues: true,
    });
  }

  private getStartDateForPeriod(
    period: 'day' | 'week' | 'month' | 'year',
  ): Date {
    const now = new Date();
    switch (period) {
      case 'day':
        return new Date(now.getFullYear(), now.getMonth(), now.getDate());
      case 'week':
        return new Date(now.setDate(now.getDate() - now.getDay()));
      case 'month':
        return new Date(now.getFullYear(), now.getMonth(), 1);
      case 'year':
        return new Date(now.getFullYear(), 0, 1);
      default:
        return new Date(); // 기본값: 현재 날짜
    }
  }
}
