import { IsString, IsOptional, MaxLength } from 'class-validator';

export class SeriesDto {
  @IsString()
  @MaxLength(100)
  title: string;

  @IsOptional()
  @IsString()
  @MaxLength(200)
  description?: string;
}
