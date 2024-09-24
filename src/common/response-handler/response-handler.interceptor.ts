import { Injectable, NestInterceptor, ExecutionContext, CallHandler, Logger } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ResponseHandlerInterceptor<T> implements NestInterceptor<T, any> {
  private readonly logger = new Logger('APIResponse');

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();

    const { method, originalUrl } = request;
    const fullUrl = `${request.protocol}://${request.get('host')}${originalUrl}`;

    return next.handle().pipe(
      map((data) => {
        this.logger.log(
          `Handling ${method} request for ${fullUrl} with status code: ${response.statusCode}`,
        );

        return {
          status: true,
          statusCode: response.statusCode,
          timestamp: new Date().toISOString(),
          data,
        };
      }),
    );
  }
}
