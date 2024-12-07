import { forwardRef, Module } from '@nestjs/common';

import { AuthModule } from 'src/auth/auth.module';
import { EmailModule } from 'src/email/email.module';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserEntity } from './entity/user.entity';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserAuthorityEntity } from './entity/user.authority.entity';

@Module({
  imports: [
    forwardRef(() => AuthModule),
    EmailModule,
    TypeOrmModule.forFeature([UserEntity, UserAuthorityEntity]),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule {}
