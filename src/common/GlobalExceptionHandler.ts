import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

@Catch()
export class GlobalExceptionHandler implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    console.error(`[ERROR] ${request.method} ${request.url}`, exception);

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal server error';

    // HTTP exceptions (BadRequest, NotFound, etc.)
    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const res = exception.getResponse();

      message = typeof res === 'string' ? res : (res as any).message || message;
    }

    // Mongoose CastError (invalid ObjectId)
    if ((exception as any).name === 'CastError') {
      status = HttpStatus.BAD_REQUEST;
      message = 'Invalid ID format';
    }

    // JWT errors
    if ((exception as any).name === 'JsonWebTokenError') {
      status = HttpStatus.UNAUTHORIZED;
      message = 'Invalid token';
    }

    return response.status(status).json({
      statusCode: status,
      message,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
