import { createParamDecorator } from '@nestjs/common';
import { getRepository } from 'typeorm';
import { Customer } from '../../models/customer.entity';

export const GetCustomer = createParamDecorator(async (data, req): Promise<Customer> => {

    const customerId = +req.params.id

    const projectRepository = getRepository(Customer);
    const customer = await projectRepository.findOne(customerId);
    
     return customer;
});