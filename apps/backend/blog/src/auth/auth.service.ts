import { Cron, CronExpression } from '@nestjs/schedule';
import { forwardRef, Inject, Injectable, UnauthorizedException } from "@nestjs/common";

import { JwtService } from '@nestjs/jwt';
import { ConfigType } from '@nestjs/config';
import { UserService } from 'src/users/user.service';
import authConfig from 'src/config/auth.config';

import { Payload } from './dto/payload.dto.interface';
import { UserInfo } from 'src/users/user.info';
import { RefreshTokenDto } from 'src/users/dto/token/refresh.token.dto';

@Injectable()
export class AuthService {

  constructor(
    private jwtService: JwtService,
    @Inject(forwardRef(() => UserService)) private userService: UserService,
    @Inject(authConfig.KEY) private config: ConfigType<typeof authConfig>,
  ) {}

  async login(user: UserInfo) {
    this.convertInAuthorities(user);

    const access_token = await this.generateAccessToken(user);
    const refresh_token = await this.generateRefreshToken(user);
    
    return { access_token, refresh_token };
  }

  @Cron(CronExpression.EVERY_DAY_AT_10AM) 
  async removeExpiredTokens() {
    const currentTime = new Date().getTime();
    const expiredTokens = await this.userService.findExpiredTokens(currentTime);
    console.log(expiredTokens);
    for (const token of expiredTokens) {
      if (token.currentRefreshToken) {
        await this.userService.removeRefreshToken(token.userId); 
      }
    }
  }

  async refresh(refreshTokenDto: RefreshTokenDto): Promise<{ accessToken: string }> {
    const { refresh_token } = refreshTokenDto;

    const decodedRefreshToken = this.jwtService.verify(refresh_token, { secret: this.config.jwtRefreshSecret }) as Payload;

    const userId = decodedRefreshToken.id;
    const user = await this.userService.getUserIfRefreshTokenMatches(refresh_token, userId);
    if (!user) {
      throw new UnauthorizedException('Invalid user!');
    }

    const accessToken = await this.generateAccessToken(user);

    return {accessToken};
  }

  async generateAccessToken(user: UserInfo): Promise<string> {
    
    const payload: Payload = {
      id: user.id,
      name: user.name,
      email: user.email,
      authorities: user.authorities
    }
    return this.jwtService.signAsync(payload);
  }

  async generateRefreshToken(user: UserInfo): Promise<string> {
    
    return this.jwtService.signAsync({id: user.id}, {
      secret: this.config.jwtRefreshSecret,
      expiresIn: 2000000,
    });
  }

  private convertInAuthorities(user: any): UserInfo {
    if(user && user.authorities) {
      const authorities: any[] = [];
      user.authorities.forEach(authority => {
        authorities.push({name: authority.authority});
      });
      user.authorities = authorities;
    }
    return user;
  }
}