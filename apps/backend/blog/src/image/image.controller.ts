import {
  Post,
  Controller,
  UploadedFile,
  UseInterceptors,
  UseGuards,
  Delete,
  Param,
} from '@nestjs/common';
import { AuthGuard } from 'src/guard/auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';

import { ImageService } from './image.service';

@Controller('api.image')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @Post('/upload')
  @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    return this.imageService.uploadFile(file);
  }

  @Delete(':fileName')
  @UseGuards(AuthGuard)
  async deleteFile(@Param('fileName') fileName: string) {
    return this.imageService.deleteFile(fileName);
  }
}
