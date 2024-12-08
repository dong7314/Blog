import { Inject, Injectable } from "@nestjs/common";
import { Request } from "express";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";

import { UserService } from "src/users/user.service";

import authConfig from "src/config/auth.config";
import { ConfigType } from "@nestjs/config";

import { Payload } from "../dto/payload.dto.interface";
import { UserInfo } from "src/users/user.info";

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor(
    private readonly userService: UserService,
    @Inject(authConfig.KEY) private config: ConfigType<typeof authConfig>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request) => {
          return request?.cookies?.refresh_token;
        },
      ]),
      secretOrKey: config.jwtRefreshSecret,
      passReqToCallback: true,
    })
  }

  async validate(req: Request, payload: Payload) {
    const refreshToken = req.cookies['refresh_token'];
    const user: UserInfo = await this.userService.getUserIfRefreshTokenMatches(
      refreshToken,
      payload.id
    );
    return user;
  }
}