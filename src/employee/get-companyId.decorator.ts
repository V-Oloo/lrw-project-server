import { createParamDecorator } from '@nestjs/common';
import { Employee } from '../models/employee.entity';

export const GetCompanyId = createParamDecorator((data: string, req): Employee => {
  return data ? req.user && req.user[data] : req.user;
});