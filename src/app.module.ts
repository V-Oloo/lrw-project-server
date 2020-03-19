import { Module, DynamicModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeesModule } from './employee/employees.module';
import { CompanyModule } from './company/company.module';
import { CommentsModule } from './comments/comments.module';
import { CustomerModule } from './customer/customer.module';
import { ProjectModule } from './project/project.module';
import { TasksModule } from './tasks/tasks.module';
import * as ormconfig from './ormconfig';
import { configurationService } from './config/configuration.service';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { HttpErrorFilter } from './shared/http-error.filter';
import { TransformInterceptor } from './shared/transform.interceptor';
import { FileModule } from './file/file.module';
import { HandlebarsAdapter, MailerModule } from '@nestjs-modules/mailer';

// export function DatabaseOrmModule(): DynamicModule {
//   // we could load the configuration from dotEnv here,
//   // but typeORM cli would not be able to find the configuration file.

//   return TypeOrmModule.forRoot(ormconfig);
// }

@Module({
  imports: [ 
     TypeOrmModule.forRoot(configurationService.getTypeOrmConfig()),
     EmployeesModule, 
     CompanyModule, 
     CommentsModule, 
     CustomerModule, 
     ProjectModule, 
     TasksModule, 
     FileModule,
     MailerModule.forRoot({
      transport: {
        host: 'email-smtp.ap-south-1.amazonaws.com',
        port: 587,
        rejectUnauthorized: true,
        tls: {
          ciphers: 'SSLv3'
        },
        secure: false, // true for 465, false for other ports
        auth: {
          user: 'BAidcVXlmFbDrH0uwzXWeZeoIv6ycvv7BMq3L29j8Efk', // generated ethereal user
          pass: 'AKIA4OE6DJIJZXGY3LGJ' // generated ethereal password
        },
      },
      defaults: {
        from: '"nest-modules" <support@lrw.com>', // outgoing email ID
      },
      template: {
        dir: process.cwd() + '/template/',
        adapter: new HandlebarsAdapter(), // or new PugAdapter()
        options: {
          strict: true,
        },
      },
    }),
    ],
  controllers: [],
  providers: [
    // {provide: APP_FILTER, useClass: HttpErrorFilter},
    {provide: APP_INTERCEPTOR, useClass: TransformInterceptor}
  ],
})
export class AppModule {

  static host: string;
  static port: number | string;
  static isDev: boolean;

  constructor() {
    AppModule.port = AppModule.normalizePort(configurationService.getPort());
    AppModule.host = configurationService.getHost();
    AppModule.isDev = configurationService.isDevelopment();
  }
  

  private static normalizePort(param: number | string): number | string {
    const portNumber: number = typeof param === 'string' ? parseInt(param, 10) : param;
    if(isNaN(portNumber)) return param;
    else if (portNumber >= 0) return portNumber;
  }
}
