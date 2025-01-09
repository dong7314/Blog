import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Series } from './entity/series.entity';
import { UserEntity } from 'src/users/entity/user.entity';
import { Post } from 'src/post/entity/post.entity';
import { SeriesDto } from './dto/series.dto';

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
  ): Promise<Series> {
    // user 처리
    const author = await this.userRepository.findOne({ where: { id: userId } });
    if (!author) {
      throw new NotFoundException('유저가 존재하지 않습니다.');
    }

    const existingSeries = await this.seriesRepository.find({
      where: { author: { id: userId }, title: createSeriesDto.title },
    });

    if (existingSeries) {
      throw new ConflictException('존재하는 시리즈 타이틀 입니다.');
    }

    const series = this.seriesRepository.create({
      ...createSeriesDto,
      author,
    });
    return this.seriesRepository.save(series);
  }

  async getUserSeries(userId: number): Promise<Series[]> {
    return this.seriesRepository.find({
      where: { author: { id: userId } },
      relations: ['posts'],
    });
  }

  async getSeriesById(seriesId: number): Promise<Series> {
    const series = await this.seriesRepository.findOne({
      where: { id: seriesId },
      relations: ['posts'],
    });
    if (!series) {
      throw new NotFoundException('시리즈를 찾을 수 없습니다.');
    }
    return series;
  }

  async updateSeries(
    seriesId: number,
    updateSeriesDto: SeriesDto,
    userId: number,
  ): Promise<Series> {
    const series = await this.getSeriesById(seriesId);
    if (series.author.id !== userId) {
      throw new NotFoundException('시리즈를 변경할 권한이 없습니다.');
    }

    Object.assign(series, updateSeriesDto);
    return this.seriesRepository.save(series);
  }

  async deleteSeries(seriesId: number, userId: number): Promise<void> {
    const series = await this.getSeriesById(seriesId);
    if (series.author.id !== userId) {
      throw new NotFoundException('시리즈를 삭제할 권한이 없습니다.');
    }
    await this.seriesRepository.remove(series);
  }

  async removePostFromSeries(
    seriesId: number,
    postId: number,
  ): Promise<Series> {
    const series = await this.getSeriesById(seriesId);
    const post = await this.postRepository.findOne({ where: { id: postId } });

    if (!post || post.series.id !== seriesId) {
      throw new NotFoundException(
        '포스트가 시리즈에 속하지 않거나 존재하지 않습니다.',
      );
    }

    post.series = null;
    post.seriesOrder = null; // 시리즈 순서 제거
    await this.postRepository.save(post);

    return series;
  }
}
