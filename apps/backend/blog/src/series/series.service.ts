import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Series } from './entity/series.entity';
import { UserEntity } from 'src/users/entity/user.entity';
import { Post } from 'src/post/entity/post.entity';
import { SeriesDto } from './dto/series.dto';
import { SeriesDao } from './dao/series.dao';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class SeriesService {
  constructor(
    @InjectRepository(Series)
    private readonly seriesRepository: Repository<Series>,
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async createSeries(
    createSeriesDto: SeriesDto,
    userId: number,
  ): Promise<SeriesDao> {
    // user 처리
    const author = await this.userRepository.findOne({ where: { id: userId } });
    if (!author) {
      throw new NotFoundException('유저가 존재하지 않습니다.');
    }

    const existingSeries = await this.seriesRepository.findOne({
      where: { author: { id: userId }, title: createSeriesDto.title },
    });

    if (existingSeries) {
      throw new ConflictException('존재하는 시리즈 타이틀 입니다.');
    }

    const series = this.seriesRepository.create({
      ...createSeriesDto,
      author,
    });

    return plainToInstance(SeriesDao, this.seriesRepository.save(series), {
      excludeExtraneousValues: true,
    });
  }

  async getSeriesById(seriesId: number): Promise<SeriesDao> {
    const series = await this.seriesRepository.findOne({
      where: { id: seriesId },
      relations: ['posts', 'author'],
    });
    if (!series) {
      throw new NotFoundException('시리즈를 찾을 수 없습니다.');
    }
    return plainToInstance(SeriesDao, series, {
      excludeExtraneousValues: true,
    });
  }

  async getUserSeries(userId: number): Promise<SeriesDao[]> {
    const seriesList = await this.seriesRepository.find({
      where: { author: { id: userId } },
      relations: ['posts', 'author'],
    });

    return plainToInstance(SeriesDao, seriesList, {
      excludeExtraneousValues: true,
    });
  }

  async updateSeries(
    seriesId: number,
    updateSeriesDto: SeriesDto,
    userId: number,
  ): Promise<SeriesDao> {
    const series = await this.seriesRepository.findOne({
      where: { id: seriesId },
      relations: ['author', 'posts'],
    });

    if (series.author.id !== userId) {
      throw new UnauthorizedException('시리즈를 변경할 권한이 없습니다.');
    }

    // updateSeriesDto.posts가 있는 경우, seriesOrder 업데이트 처리
    if (updateSeriesDto.posts) {
      for (const updatedPost of updateSeriesDto.posts) {
        // 기존 Post 찾기
        const post = series.posts.find((p) => p.id === updatedPost.id);
        if (post) {
          post.seriesOrder = updatedPost.seriesOrder;
          await this.postRepository.save(post);
        }
      }
    }

    series.title = updateSeriesDto.title;
    series.description = updateSeriesDto.description;

    // 업데이트 된 시리즈 저장장
    await this.seriesRepository.save(series);

    return plainToInstance(SeriesDao, series, {
      excludeExtraneousValues: true,
    });
  }

  async deleteSeries(seriesId: number, userId: number): Promise<void> {
    const series = await this.seriesRepository.findOne({
      where: { id: seriesId },
      relations: ['author'],
    });

    if (series.author.id !== userId) {
      throw new UnauthorizedException('시리즈를 삭제할 권한이 없습니다.');
    }
    await this.seriesRepository.remove(series);
  }

  async removePostFromSeries(
    seriesId: number,
    postId: number,
    userId: number,
  ): Promise<void> {
    const series = await this.seriesRepository.findOne({
      where: { id: seriesId },
      relations: ['posts', 'author'],
    });

    if (series.author.id !== userId) {
      throw new UnauthorizedException(
        '시리즈 포스트를 삭제할 권한이 없습니다.',
      );
    }

    const post = await this.postRepository.findOne({
      where: { id: postId },
      relations: ['series'],
    });

    if (!post || post.series.id !== seriesId) {
      throw new NotFoundException(
        '포스트가 시리즈에 속하지 않거나 존재하지 않습니다.',
      );
    }

    post.series = null;
    post.seriesOrder = null; // 시리즈 순서 제거
    await this.postRepository.save(post);
  }
}
