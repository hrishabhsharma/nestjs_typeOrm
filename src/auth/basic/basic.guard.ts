import { Injectable, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';
import { IS_PUBLIC_KEY } from '../public/public.decorator';

@Injectable()
export class BasicAuthGuard extends AuthGuard('basic') {
  constructor(private reflector: Reflector) {
    super();
  }
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const guardsToBypass = this.reflector.getAllAndOverride<string[]>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (guardsToBypass?.includes('basic')) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Basic ')) {
      throw new UnauthorizedException(
        'Unauthorized request: Missing or invalid Basic Authorization header',
      );
    }

    const token = authHeader.split(' ')[1];
    if (!token || token.length < 5) {
      throw new UnauthorizedException('Authorization token is missing');
    }

    return super.canActivate(context);
  }
}
