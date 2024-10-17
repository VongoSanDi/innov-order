import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Response<T> {
  data: T;
  statusCode: number;
  message: string;
  timestamp: string;
}

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    return next.handle().pipe(
      map((data) => {
        const response = context.switchToHttp().getResponse();
        const statusCode = response.statusCode;
        // Used for the public API response
        if (data.status && data.result) {
          return {
            data: data.product || {},
            statusCode: data.status === 'success' ? 200 : 404,
            message: data.result.lc_name || data.result.name,
            timestamp: new Date().toISOString(),
            // originalResponse: data, // Is there a case where i should send the original response ?
          };
        }

        // Used for my API response such as login
        return {
          data,
          statusCode,
          message: 'Opération réussie',
          timestamp: new Date().toISOString(),
        };
      }),
    );
  }
}
