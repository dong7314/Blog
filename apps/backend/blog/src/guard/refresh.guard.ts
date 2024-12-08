import { Observable } from 'rxjs';
import { AuthGuard as NestAuthGuard } from "@nestjs/passport"; 
import { ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class RefreshGuard extends NestAuthGuard('jwt-refresh') {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    return super.canActivate(context);
  }
}