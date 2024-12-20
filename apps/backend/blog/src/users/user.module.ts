import { forwardRef, Module } from '@nestjs/common';

import { AuthModule } from 'src/auth/auth.module';
import { EmailModule } from 'src/email/email.module';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserEntity } from './entity/user.entity';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserTokenEntity } from './entity/user.token.entity';
import { UserAuthorityEntity } from './entity/user.authority.entity';

@Module({
  imports: [
    EmailModule,
    forwardRef(() => AuthModule),
    TypeOrmModule.forFeature([
      UserEntity,
      UserAuthorityEntity,
      UserTokenEntity
    ]),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule {}
