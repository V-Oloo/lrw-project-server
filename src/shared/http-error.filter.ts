import { Catch, ExceptionFilter, HttpException, ArgumentsHost, Logger } from '@nestjs/common';

@Catch(HttpException)

export class HttpErrorFilter implements ExceptionFilter {
   async catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const request = ctx.getRequest();
        const response = ctx.getResponse();
        const status = exception.getStatus();

        const errorResponse = {
            code: status,
            path: request.url,
            method: request.method,
            message: exception.message.error || exception.message || null,
        }

        Logger.error(`${request.method} ${request.url}`,exception.stack, 'ExceptionFilter');

        response.status(status).json(errorResponse);

    }
}