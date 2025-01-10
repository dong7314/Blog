import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Body,
  Param,
  Req,
} from '@nestjs/common';
import { Request } from 'express';

import { JwtService } from '@nestjs/jwt';
import { SeriesService } from './series.service';

import { SeriesDto } from './dto/series.dto';
import { SeriesDao } from './dao/series.dao';

@Controller('api.series')
export class SeriesController {
  constructor(
    private readonly jwtService: JwtService,
    private readonly seriesService: SeriesService,
  ) {}

  @Post('')
  createSeries(
    @Body() createSeriesDto: SeriesDto,
    @Req() req,
  ): Promise<SeriesDao> {
    const userId = this.getUserId(req);

    return this.seriesService.createSeries(createSeriesDto, userId);
  }

  @Get('/:seriesId')
  getSeriesById(@Param('seriesId') seriesId: number): Promise<SeriesDao> {
    return this.seriesService.getSeriesById(seriesId);
  }

  @Get('/author/:userId')
  getUserSeries(
    @Param('userId') userId: number,
    @Req() req,
  ): Promise<SeriesDao[]> {
    return this.seriesService.getUserSeries(userId);
  }

  @Put('/:seriesId')
  updateSeries(
    @Param('seriesId') seriesId: number,
    @Body() updateSeriesDto: SeriesDto,
    @Req() req,
  ): Promise<SeriesDao> {
    const userId = this.getUserId(req);
    return this.seriesService.updateSeries(seriesId, updateSeriesDto, userId);
  }

  @Delete('/:seriesId')
  deleteSeries(@Param('seriesId') seriesId: number, @Req() req) {
    const userId = this.getUserId(req);
    return this.seriesService.deleteSeries(seriesId, userId);
  }

  @Delete('/:seriesId/posts/:postId')
  removePostFromSeries(
    @Param('seriesId') seriesId: number,
    @Param('postId') postId: number,
    @Req() req,
  ) {
    const userId = this.getUserId(req);
    return this.seriesService.removePostFromSeries(seriesId, postId, userId);
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
