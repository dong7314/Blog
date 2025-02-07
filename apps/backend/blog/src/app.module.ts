import { Module } from '@nestjs/common';
import { UserModule } from './users/user.module';
import { LikeModule } from './like/like.module';
import { PostModule } from './post/post.module';
import { ImageModule } from './image/image.module';
import { SeriesModule } from './series/series.module';
import { ConfigModule } from '@nestjs/config';
import { FollowModule } from './follow/follow.module';
import { CommentModule } from './comment/comment.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleModule } from '@nestjs/schedule';

import urlConfig from './config/url.config';
import authConfig from './config/auth.config';
import minioConfig from './config/minio.config';
import emailConfig from './config/email.config';
import { validationSchema } from './config/validation.schema';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    ConfigModule.forRoot({
      envFilePath: [`${__dirname}/config/env/.${process.env.NODE_ENV}.env`],
      load: [emailConfig, authConfig, urlConfig, minioConfig],
      isGlobal: true,
      validationSchema,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: 'test',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: process.env.DATABASE_SYNCHRONIZE === 'true',
    }),
    UserModule,
    LikeModule,
    FollowModule,
    SeriesModule,
    CommentModule,
    PostModule,
    ImageModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
