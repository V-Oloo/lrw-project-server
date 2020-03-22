import { Catch, ExceptionFilter, HttpException, ArgumentsHost, Logger, HttpStatus } from '@nestjs/common';
import { response } from 'express';

@Catch(HttpException)

export class HttpErrorFilter implements ExceptionFilter {
   async catch(exception: any, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const request = ctx.getRequest();
        // const response = ctx.getResponse();
        // const status = exception.getStatus();

        Logger.error(exception)

        let status = HttpStatus.INTERNAL_SERVER_ERROR;
 
        const message = (exception instanceof Error) ? exception.message : exception.message.error;
     
        if (exception.status === HttpStatus.NOT_FOUND) {
          status = HttpStatus.NOT_FOUND;
        }
     
        if (exception.status === HttpStatus.SERVICE_UNAVAILABLE) {
          status = HttpStatus.SERVICE_UNAVAILABLE;
        }
     
        if (exception.status === HttpStatus.NOT_ACCEPTABLE) {
          status = HttpStatus.NOT_ACCEPTABLE;
        }
     
        if (exception.status === HttpStatus.EXPECTATION_FAILED) {
          status = HttpStatus.EXPECTATION_FAILED;
        }
     
        if (exception.status === HttpStatus.BAD_REQUEST) {
          status = HttpStatus.BAD_REQUEST;
        }
     
        response
          .status(status)
          .json({
            status,
            success: false,
            data: [],
            error: message,
            message: (status === HttpStatus.INTERNAL_SERVER_ERROR) ? 'Sorry we are experiencing technical problems.' : '',
          });
      }

}
