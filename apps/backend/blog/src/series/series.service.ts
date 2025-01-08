import { Injectable, NotFoundException } from '@nestjs/common';
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
  ) {}

  async createSeries(
    createSeriesDto: SeriesDto,
    user: UserEntity,
  ): Promise<Series> {
    const series = this.seriesRepository.create({
      ...createSeriesDto,
      author: user,
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
      throw new NotFoundException('Series not found');
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
      throw new NotFoundException(
        'You do not have permission to update this series',
      );
    }
    Object.assign(series, updateSeriesDto);
    return this.seriesRepository.save(series);
  }

  async deleteSeries(seriesId: number, userId: number): Promise<void> {
    const series = await this.getSeriesById(seriesId);
    if (series.author.id !== userId) {
      throw new NotFoundException(
        'You do not have permission to delete this series',
      );
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
