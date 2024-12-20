import { Body, Controller, Get, HttpCode, HttpStatus, Inject, Param, Post, Query, Req, Res, UnauthorizedException, UseGuards } from '@nestjs/common';
import { Response, Request } from 'express';
import { ConfigType } from '@nestjs/config';

import { LoginUserDto } from './dto/user/user-login.dto';
import { CreateUserDto } from './dto/user/create-user.dto';
import { VerifyEmailDto } from './dto/email/verify-email.dto';
import { RefreshTokenDto } from './dto/token/refresh.token.dto';

import { AuthGuard } from 'src/guard/auth.guard';
import { RolesGuard } from 'src/guard/role.guard';
import { RefreshGuard } from 'src/guard/refresh.guard';

import { UserService } from './user.service';
import { AuthService } from 'src/auth/auth.service';

import urlConfig from 'src/config/url.config';
import { Roles } from 'src/decorator/role.decorator';
import { UserAuthorityEnum } from './entity/enum/user.authority.enum';

@Controller('api.user')
export class UserController {

  constructor(
    private userService: UserService,
    private authService: AuthService,
    @Inject(urlConfig.KEY) private config: ConfigType<typeof urlConfig>,
  ) { }

  @Post()
  async createUser(@Body() dto: CreateUserDto): Promise<void> {
    const { name, email, password } = dto;
    await this.userService.createUser(name, email, password);
  }

  @Post('/email-verify')
  async verifyEmail(@Query() dto: VerifyEmailDto, @Res() res: Response,): Promise<void> {
    const { signupVerifyToken } = dto;

    await this.userService.verifyEmail(signupVerifyToken);

    res.redirect(this.config.url);
  }

  @Post('/login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() dto: LoginUserDto, @Res() res: Response): Promise<any> {
    const { email, password } = dto;

    const user = await this.userService.getUserByEmail(email);
    const jwt = await this.userService.login(email, password);

    await this.userService.setCurrentRefreshToken(jwt.refresh_token, user.id);

    res.setHeader('Authorization', 'Bearer ' + jwt.access_token);
    res.cookie('access_token', jwt.access_token, { httpOnly: true });
    res.cookie('refresh_token', jwt.refresh_token, { httpOnly: true });

    return res.json(jwt);
  }

  @Post('/logout')
  @UseGuards(RefreshGuard)
  @HttpCode(HttpStatus.OK)
  async logout(@Req() req: any, @Res() res: Response): Promise<any> {
    await this.userService.removeRefreshToken(req.user.id);
    res.clearCookie('access_token');
    res.clearCookie('refresh_token');
    return res.send({
      message: 'logout success'
    });
  }

  @Post('refresh')
  async refresh(
    @Body() refreshTokenDto: RefreshTokenDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    try {
      const newAccessToken = (await this.authService.refresh(refreshTokenDto)).accessToken;
      res.setHeader('Authorization', 'Bearer ' + newAccessToken);
      res.cookie('access_token', newAccessToken, { httpOnly: true });
      res.send({newAccessToken});
    } catch(err) {
      throw new UnauthorizedException('refresh-token이 유효하지 않습니다.');
    }
  }

  @Get('/authenticate')
  @UseGuards(AuthGuard)
  isAuthenticated(@Req() req: Request): any {
    const user: any = req.user;
    return user;
  }

  @Get('/admin-role')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserAuthorityEnum.GUEST)
  adminRoleCheck(@Req() req: Request): any {
    const user: any = req.user;
    return user
  }
}
