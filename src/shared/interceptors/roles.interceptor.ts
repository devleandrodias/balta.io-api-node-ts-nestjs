import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  HttpException,
  HttpStatus,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtPayload } from '../interfaces/jwtPayload.interface';
import { GenericResult } from '../result.model';
import { GenericMessage } from '../genericMessages.enum';

@Injectable()
export class RoleInterceptor implements NestInterceptor {
  constructor(public roles: string[]) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> {
    const payload: JwtPayload = context.switchToHttp().getRequest().user;

    let hasRole = false;

    payload.roles.forEach(role => {
      if (this.roles.includes(role)) hasRole = true;
    });

    if (!hasRole) {
      throw new HttpException(
        new GenericResult(GenericMessage.AccessNotPermited, false, null, null),
        HttpStatus.FORBIDDEN,
      );
    }

    return next.handle();
  }
}
