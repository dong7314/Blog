import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Post } from 'src/post/entity/post.entity';
import { Series } from './entity/series.entity';
import { UserEntity } from 'src/users/entity/user.entity';
import { JwtService } from '@nestjs/jwt';
import { SeriesService } from './series.service';
import { SeriesController } from './series.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Post, UserEntity, Series])],
  providers: [SeriesService, JwtService],
  controllers: [SeriesController],
})
export class SeriesModule {}
