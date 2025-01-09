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

@Controller('api.series')
export class SeriesController {
  constructor(
    private readonly jwtService: JwtService,
    private readonly seriesService: SeriesService,
  ) {}

  @Post('')
  createSeries(@Body() createSeriesDto: SeriesDto, @Req() req) {
    const userId = this.getUserId(req);

    return this.seriesService.createSeries(createSeriesDto, userId);
  }

  @Get('')
  getUserSeries(@Req() req) {
    const userId = this.getUserId(req);

    return this.seriesService.getUserSeries(userId);
  }

  @Get('/:seriesId')
  getSeriesById(@Param('seriesId') seriesId: number) {
    return this.seriesService.getSeriesById(seriesId);
  }

  @Put('/:seriesId')
  updateSeries(
    @Param('seriesId') seriesId: number,
    @Body() updateSeriesDto: SeriesDto,
    @Req() req,
  ) {
    const user = req.user;
    return this.seriesService.updateSeries(seriesId, updateSeriesDto, user.id);
  }

  @Delete('/:seriesId')
  deleteSeries(@Param('seriesId') seriesId: number, @Req() req) {
    const user = req.user;
    return this.seriesService.deleteSeries(seriesId, user.id);
  }

  @Delete('/:seriesId/posts/:postId')
  removePostFromSeries(
    @Param('seriesId') seriesId: number,
    @Param('postId') postId: number,
  ) {
    return this.seriesService.removePostFromSeries(seriesId, postId);
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
