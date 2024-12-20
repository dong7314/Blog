import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy, VerifiedCallback } from "passport-jwt";

import authConfig from "src/config/auth.config";
import { ConfigType } from "@nestjs/config";

import { UserService } from "src/users/user.service";

import { Payload } from '../dto/payload.dto.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
  constructor(
    private userService: UserService,
    @Inject(authConfig.KEY) private config: ConfigType<typeof authConfig>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.jwtSecret,
    })
  }
  
  async validate(payload: Payload, done: VerifiedCallback): Promise<any> {
    const user = await this.userService.getUserInfo(`${payload.id}`);

    if(!user) {
      return done(new UnauthorizedException({ message: '유저가 존재하지 않습니다.' }), false);
    }

    return done(null, user);
  }
}