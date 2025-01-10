import { Transform } from 'class-transformer';
import { IsBoolean, IsString } from 'class-validator';

export class UpdateCommentDto {
  @Transform((params) => params.value.trim())
  @IsString()
  readonly content: string;

  @IsBoolean()
  readonly isSecret: boolean;
}
