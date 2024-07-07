import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';
import { PinoLogger } from 'nestjs-pino';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(private readonly logger: PinoLogger) {
    this.logger.setContext(HttpExceptionFilter.name);
  }

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse();
    const hasErrorResponse =
      typeof exceptionResponse === 'object' && 'error' in exceptionResponse;

    const errorMsg = hasErrorResponse && `${exceptionResponse.error} Exception`;

    this.logger.error({
      msg: hasErrorResponse ? errorMsg : 'HTTP Exception',
      exception: {
        status,
        response: hasErrorResponse
          ? exceptionResponse.error
          : exceptionResponse,
      },
    });

    response.status(status).json({
      statusCode: status,
      ...(typeof exceptionResponse === 'string'
        ? { message: exceptionResponse }
        : exceptionResponse),
    });
  }
}
