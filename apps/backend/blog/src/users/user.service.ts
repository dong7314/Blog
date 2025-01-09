import * as uuid from 'uuid';
import * as bcrypt from 'bcrypt';
import {
  forwardRef,
  Inject,
  Injectable,
  NotAcceptableException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource, LessThan } from 'typeorm';

import { UserInfo } from './user.info';
import { UserEntity } from './entity/user.entity';
import { AuthService } from 'src/auth/auth.service';
import { EmailService } from 'src/email/email.service';
import { UserStatusEnum } from './entity/enum/user.status.enum';
import { UserAuthorityEntity } from './entity/user.authority.entity';
import { UserAuthorityEnum } from './entity/enum/user.authority.enum';
import { UserTokenEntity } from './entity/user.token.entity';

@Injectable()
export class UserService {
  constructor(
    private dataSource: DataSource,
    private emailService: EmailService,
    @Inject(forwardRef(() => AuthService)) private authService: AuthService,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    @InjectRepository(UserTokenEntity)
    private tokenRepository: Repository<UserTokenEntity>,
  ) {}

  async createUser(name: string, email: string, password: string) {
    if (await this.checkUserExists(email)) {
      throw new NotAcceptableException('이미 존재하는 이메일입니다.');
    }

    const signupVerifyToken = uuid.v1();

    const createdUser = await this.saveUser(
      name,
      email,
      password,
      '',
      signupVerifyToken,
    );
    await this.saveAuthority(createdUser, 'guest');
    await this.saveToken(createdUser, null, null);
    await this.sendMemberJoinEmail(email, signupVerifyToken);
  }

  async verifyEmail(signupVerifyToken: string): Promise<any> {
    const user = await this.userRepository.findOne({
      where: { signupVerifyToken },
    });

    if (!user) {
      throw new NotFoundException('유저가 존재하지 않습니다.');
    }

    user.status = UserStatusEnum.ENABLED;
    this.userRepository.save(user);

    const jwt = await this.authService.login({
      id: user.id,
      name: user.name,
      email: user.email,
      authorities: user.authorities,
    });

    return {
      access_token: jwt.access_token,
      refresh_token: jwt.refresh_token,
    };
  }

  async login(
    email: string,
    password: string,
  ): Promise<{ access_token: string; refresh_token: string }> {
    const user = await this.userRepository.findOne({
      where: { email },
    });

    const validatePassword = await bcrypt.compare(password, user.password);

    if (!user || !validatePassword) {
      throw new UnauthorizedException('사용자 정보가 올바르지 않습니다.');
    }

    if (user.status === UserStatusEnum.DISABLED) {
      throw new UnauthorizedException('이메일 인증을 진행해 주세요.');
    }

    const jwt = await this.authService.login({
      id: user.id,
      name: user.name,
      email: user.email,
      authorities: user.authorities,
    });

    return {
      access_token: jwt.access_token,
      refresh_token: jwt.refresh_token,
    };
  }

  async getUserInfo(userId: string): Promise<UserInfo> {
    const id = parseInt(userId);

    const user = await this.userRepository.findOne({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException('유저가 존재하지 않습니다.');
    }

    this.flatAuthorities(user);

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      authorities: user.authorities,
    };
  }

  async getUserByEmail(email: string) {
    const user = await this.userRepository.findOne({
      where: { email },
    });

    return user;
  }

  async setCurrentRefreshToken(refreshToken: string, user: UserEntity) {
    let token = await this.tokenRepository.findOne({
      where: { userId: user.id },
    });

    const currentRefreshToken =
      await this.getCurrentHashedRefreshToken(refreshToken);
    const currentRefreshTokenExp = await this.getCurrentRefreshTokenExp();

    if (!token) {
      token = await this.saveToken(
        user,
        currentRefreshToken,
        currentRefreshTokenExp,
      );
    }

    await this.tokenRepository.update(token.id, {
      currentRefreshToken,
      currentRefreshTokenExp,
    });
  }

  async getCurrentHashedRefreshToken(refreshToken: string) {
    const saltOrRounds = 10;
    const currentRefreshToken = await bcrypt.hash(refreshToken, saltOrRounds);
    return currentRefreshToken;
  }

  async getCurrentRefreshTokenExp(): Promise<Date> {
    const currentDate = new Date();
    const currentRefreshTokenExp = new Date(currentDate.getTime() + 2000000000);
    return currentRefreshTokenExp;
  }

  async getUserIfRefreshTokenMatches(
    refreshToken: string,
    userId: number,
  ): Promise<UserInfo> {
    const token: UserTokenEntity = await this.tokenRepository.findOne({
      where: { userId },
    });

    if (!token.currentRefreshToken) {
      return null;
    }

    const isRefreshTokenMatching = await bcrypt.compare(
      refreshToken,
      token.currentRefreshToken,
    );

    if (isRefreshTokenMatching) {
      return await this.getUserInfo(`${userId}`);
    }
  }

  async removeRefreshToken(userId: number): Promise<any> {
    const token = await this.tokenRepository.findOne({
      where: { userId },
    });

    return await this.tokenRepository.update(token.id, {
      currentRefreshToken: null,
      currentRefreshTokenExp: null,
    });
  }

  async findExpiredTokens(currentTime: number): Promise<UserTokenEntity[]> {
    const currentDate = new Date(currentTime);

    const expiredTokens = this.tokenRepository.find({
      where: { currentRefreshTokenExp: LessThan(currentDate) },
    });

    return expiredTokens;
  }

  private async checkUserExists(emailAddress: string) {
    const user = await this.userRepository.findOne({
      where: { email: emailAddress },
    });

    return user !== null;
  }

  private async saveUser(
    name: string,
    email: string,
    password: string,
    description: string,
    signupVerifyToken: string,
  ): Promise<UserEntity> {
    let savedUser: UserEntity;

    await this.dataSource.transaction(async (manager) => {
      const user = new UserEntity();
      user.name = name;
      user.email = email;
      user.description = description;
      user.password = await bcrypt.hash(password, 10);
      user.signupVerifyToken = signupVerifyToken;

      savedUser = await manager.save(user);
    });

    return savedUser;
  }

  private async saveAuthority(
    user: UserEntity,
    authority: 'admin' | 'user' | 'guest',
  ) {
    await this.dataSource.transaction(async (manager) => {
      const authorityEntity = new UserAuthorityEntity();
      authorityEntity.user = user;
      authorityEntity.authority =
        authority === 'admin'
          ? UserAuthorityEnum.ADMIN
          : authority === 'user'
            ? UserAuthorityEnum.USER
            : UserAuthorityEnum.GUEST;

      await manager.save(authorityEntity);
    });
  }

  private async saveToken(
    user: UserEntity,
    refreshToken: string,
    refreshExp: Date,
  ) {
    let token: UserTokenEntity;

    await this.dataSource.transaction(async (manager) => {
      const newToken = new UserTokenEntity();
      newToken.user = user;
      newToken.currentRefreshToken = refreshToken;
      newToken.currentRefreshTokenExp = refreshExp;

      token = await manager.save(newToken);
    });

    return token;
  }

  private async sendMemberJoinEmail(email: string, signupVerifyToken: string) {
    await this.emailService.sendMemberJoinVerification(
      email,
      signupVerifyToken,
    );
  }

  private flatAuthorities(user: UserInfo): UserInfo {
    if (user && user.authorities) {
      const authorities: string[] = [];
      user.authorities.forEach((authority) => {
        authorities.push(authority.authority);
      });
      user.authorities = authorities;
    }
    return user;
  }
}
