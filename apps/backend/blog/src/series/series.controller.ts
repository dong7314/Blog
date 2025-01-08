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

import { SeriesService } from './series.service';
import { SeriesDto } from './dto/series.dto';

@Controller('series')
export class SeriesController {
  constructor(private readonly seriesService: SeriesService) {}

  @Post()
  createSeries(@Body() createSeriesDto: SeriesDto, @Req() req) {
    const user = req.user;
    return this.seriesService.createSeries(createSeriesDto, user);
  }

  @Get('/user')
  getUserSeries(@Req() req) {
    const user = req.user;
    return this.seriesService.getUserSeries(user.id);
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
}
