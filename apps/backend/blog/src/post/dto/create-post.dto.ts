import { Transform } from 'class-transformer';
import {
  IsArray,
  IsInt,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class PostDto {
  @Transform((params) => params.value.trim())
  @IsString()
  @MinLength(1)
  @MaxLength(100)
  readonly title: string;

  @IsString()
  @MaxLength(200)
  @IsOptional()
  readonly description: string;

  @IsString()
  readonly content: string;

  @IsArray()
  @IsString({ each: true })
  readonly tags: string[];

  @IsString()
  @IsOptional()
  readonly thumbnail: string;

  @IsOptional()
  @IsInt()
  readonly seriesId?: number;
}
