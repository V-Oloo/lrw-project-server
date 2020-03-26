import { Module} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeesModule } from './employee/employees.module';
import { CompanyModule } from './company/company.module';
import { CommentsModule } from './comments/comments.module';
import { CustomerModule } from './customer/customer.module';
import { ProjectModule } from './project/project.module';
import { TasksModule } from './tasks/tasks.module';
import { configurationService } from './config/configuration.service';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { HttpErrorFilter } from './shared/http-error.filter';
import { TransformInterceptor } from './shared/transform.interceptor';
import { MulterModule } from '@nestjs/platform-express';


@Module({
  imports: [ 
     TypeOrmModule.forRoot(configurationService.getTypeOrmConfig()),
     EmployeesModule, 
     CompanyModule, 
     CommentsModule, 
     CustomerModule, 
     ProjectModule, 
     TasksModule, 
    MulterModule.register({
      dest: './files',
    })
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
