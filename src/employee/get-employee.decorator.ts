import { createParamDecorator } from '@nestjs/common';
import { Employee } from '../models/employee.entity';

export const GetUser = createParamDecorator((data, req): Employee => {
     return req.user;
});