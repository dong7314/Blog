import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Follow } from './entity/follow.entity';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from 'src/users/entity/user.entity';
import { FollowService } from './follow.service';
import { FollowController } from './follow.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Follow, UserEntity])],
  providers: [FollowService, JwtService],
  controllers: [FollowController],
})
export class FollowModule {}
