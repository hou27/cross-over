import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class SuccessInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((returnValue) => {
        const statusCode: number = context
          .switchToHttp()
          .getResponse().statusCode;

        if (typeof returnValue == 'string') {
          return {
            statusCode,
            data: null,
            message: returnValue,
          };
        } else {
          return {
            statusCode,
            data: returnValue,
          };
        }
      }),
    );
  }
}
