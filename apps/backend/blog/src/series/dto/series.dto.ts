import { IsString, IsOptional, MaxLength } from 'class-validator';
import { Post } from 'src/post/entity/post.entity';

export class SeriesDto {
  @IsString()
  @MaxLength(100)
  title: string;

  @IsOptional()
  @IsString()
  @MaxLength(200)
  description?: string;

  @IsOptional()
  posts?: Post[];
}
