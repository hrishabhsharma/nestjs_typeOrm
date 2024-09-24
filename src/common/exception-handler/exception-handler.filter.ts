import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class ExceptionHandlerFilter<T> implements ExceptionFilter {
  private readonly logger = new Logger(ExceptionHandlerFilter.name);

  catch(exception: T, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message: string | object = 'Internal server error';

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      message = exception.getResponse();
    } else if (exception instanceof Error) {
      message = exception.message;
    }

    this.logger.error(
      `Error occurred:
      URL: ${request.url}
      Method: ${request.method}
      Status: ${status}
      IP: ${request.ip}
      Body: ${JSON.stringify(request.body)}
      Headers: ${JSON.stringify(request.headers)}
      Params: ${JSON.stringify(request.params)}
      Query: ${JSON.stringify(request.query)}
      Message: ${JSON.stringify((message as any).message || message)}`,
      exception instanceof Error ? exception.stack : 'Error stack unavailable',
    );

    response.status(status).json({
      status: false,
      statusCode: status,
      timestamp: new Date().toISOString(),
      message: (message as any).message || message,
    });
  }
}
