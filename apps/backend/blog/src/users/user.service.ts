import * as uuid from 'uuid';
import * as bcrypt from 'bcrypt';
import { Injectable, NotAcceptableException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';

import { UserInfo } from './dto/user.info';
import { UserEntity } from './entity/user.entity';
import { AuthService } from 'src/auth/auth.service';
import { EmailService } from 'src/email/email.service';
import { UserStatusEnum } from './entity/enum/user.status.enum';
import { UserAuthorityEntity } from './entity/user.authority.entity';
import { UserAuthorityEnum } from './entity/enum/user.authority.enum';


@Injectable()
export class UserService {

  constructor(
    private dataSource: DataSource,
    private authService: AuthService,
    private emailService: EmailService,
    @InjectRepository(UserEntity) private userRepository: Repository<UserEntity>
  ) { }

  async createUser(name: string, email: string, password: string) {
    if (await this.checkUserExists(email)) {
      throw new NotAcceptableException('이미 존재하는 이메일입니다.');
    };

    const signupVerifyToken = uuid.v1();

    const createdUser = await this.saveUser(name, email, password, signupVerifyToken);
    await this.saveAuthority(createdUser, 'guest');
    await this.sendMemberJoinEmail(email, signupVerifyToken);
  }

  async verifyEmail(signupVerifyToken: string): Promise<string> {
    const user = await this.userRepository.findOne({
      where: { signupVerifyToken }
    });

    if (!user) {
      throw new NotFoundException('유저가 존재하지 않습니다.');
    }

    user.status = UserStatusEnum.ENABLED;
    this.userRepository.save(user);

    return this.authService.login({
      id: user.id,
      name: user.name,
      email: user.email
    });
  }

  async login(email: string, password: string): Promise<{ accessToken: string }> {

    const user = await this.userRepository.findOne({
      where: { email }
    });

    const validatePassword = await bcrypt.compare(password, user.password);
    
    if (!user || !validatePassword) {
      throw new UnauthorizedException("사용자 정보가 올바르지 않습니다.");
    }

    if (user.status === UserStatusEnum.DISABLED) {
      throw new UnauthorizedException("이메일 인증을 진행해 주세요.");
    }

    return {
      accessToken: this.authService.login({
        id: user.id,
        name: user.name,
        email: user.email,
        authorities: user.authorities
      })
    };
  }

  async getUserInfo(userId: string): Promise<UserInfo> {
    const id = parseInt(userId);

    const user = await this.userRepository.findOne({
      where: { id }
    });

    if (!user) {
      throw new NotFoundException('유저가 존재하지 않습니다.');
    }

    this.flatAuthorities(user);

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      authorities: user.authorities
    };
  }

  private async checkUserExists(emailAddress: string) {
    const user = await this.userRepository.findOne({
      where: { email: emailAddress }
    });

    return user !== null;
  }

  private async saveUser(name: string, email: string, password: string, signupVerifyToken: string): Promise<UserEntity> {
    let savedUser: UserEntity;

    await this.dataSource.transaction(async manager => {
      const user = new UserEntity();
      user.name = name;
      user.email = email;
      user.password = await bcrypt.hash(password, 10);
      user.signupVerifyToken = signupVerifyToken;

      savedUser = await manager.save(user);
    });

    return savedUser;
  }

  private async saveAuthority(user: UserEntity, authority: 'admin' | 'user' | 'guest') {
    await this.dataSource.transaction(async manager => {
      const authorityEntity = new UserAuthorityEntity();
      authorityEntity.user = user;
      authorityEntity.authority = authority === 'admin' ? UserAuthorityEnum.ADMIN 
        : authority === 'user' ? UserAuthorityEnum.USER
          : UserAuthorityEnum.GUEST;

      await manager.save(authorityEntity);
    })
  }

  private async sendMemberJoinEmail(email: string, signupVerifyToken: string) {
    await this.emailService.sendMemberJoinVerification(email, signupVerifyToken);
  }

  private flatAuthorities(user: UserInfo): UserInfo {
    if(user && user.authorities) {
      const authorities: string[] = [];
      user.authorities.forEach(authority => {
        authorities.push(authority.authority)
      });
      user.authorities = authorities;
    }
    return user;
  }
}
