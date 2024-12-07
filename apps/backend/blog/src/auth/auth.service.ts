import * as jwt from 'jsonwebtoken';
import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";

import { JwtService } from '@nestjs/jwt';
import { ConfigType } from '@nestjs/config';
import authConfig from 'src/config/auth.config';

import { Payload } from './dto/payload.dto.interface';
import { UserInfo } from 'src/users/dto/user.info';

@Injectable()
export class AuthService {

  constructor(
    private jwtService: JwtService,
    @Inject(authConfig.KEY) private config: ConfigType<typeof authConfig>,
  ) {}

  login(user: UserInfo) {
    this.convertInAuthorities(user);

    const payload: Payload = { 
      id: user.id, 
      name: user.name, 
      email: user.email,
      authorities: user.authorities
    };

    return this.jwtService.sign(payload);
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
      expiresIn: '30d',
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