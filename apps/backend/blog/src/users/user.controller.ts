import { Body, Controller, Get, Param, Post, Query, Req, Res, UseGuards } from '@nestjs/common';
import { Response, Request } from 'express';

import { UserLoginDto } from './dto/user-login.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { VerifyEmailDto } from './dto/verify-email.dto';

import { AuthGuard } from 'src/guard/auth.guard';
import { UserService } from './user.service';
import { RolesGuard } from 'src/guard/role.guard';
import { UserAuthorityEnum } from './entity/enum/user.authority.enum';
import { Roles } from 'src/decorator/role.decorator';

@Controller('api.user')
export class UserController {

  constructor(
    private userService: UserService,
  ) { }

  @Post()
  async createUser(@Body() dto: CreateUserDto): Promise<void> {
    const { name, email, password } = dto;
    await this.userService.createUser(name, email, password);
  }

  @Post('/email-verify')
  async verifyEmail(@Query() dto: VerifyEmailDto): Promise<void> {
    const { signupVerifyToken } = dto;

    await this.userService.verifyEmail(signupVerifyToken);
  }

  @Post('/login')
  async login(@Body() dto: UserLoginDto, @Res() res: Response): Promise<any> {
    const { email, password } = dto;

    const jwt = await this.userService.login(email, password);
    res.setHeader('Authorization', 'Bearer ' + jwt.accessToken);

    return res.json(jwt);
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
