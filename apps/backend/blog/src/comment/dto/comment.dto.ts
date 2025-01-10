import { Transform } from 'class-transformer';
import { IsBoolean, IsInt, IsOptional, IsString } from 'class-validator';

export class CommentDto {
  @Transform((params) => params.value.trim())
  @IsString()
  readonly content: string;

  @IsBoolean()
  readonly isSecret: boolean;

  @IsInt()
  @IsOptional()
  readonly parentId?: number;
}
