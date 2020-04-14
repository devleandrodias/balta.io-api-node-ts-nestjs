import {
  NestInterceptor,
  Injectable,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Contract } from 'src/shared/contract';
import { GenericResult } from 'src/shared/result.model';

@Injectable()
export class ValidatorInterceptor implements NestInterceptor {
  constructor(public contract: Contract) {}

  intercept(
    context: ExecutionContext,
    next: import('@nestjs/common').CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const body = context.switchToHttp().getRequest().body;
    const valid = this.contract.validate(body);

    if (!valid) {
      throw new HttpException(
        new GenericResult(
          'Ops, algo saiu errado',
          false,
          null,
          this.contract.errors,
        ),
        HttpStatus.BAD_REQUEST,
      );
    }

    return next.handle();
  }
}
