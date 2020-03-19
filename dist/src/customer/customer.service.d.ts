import { CustomerRepository } from './customer.repository';
import { Customer } from '../models/customer.entity';
import { CreateCustomerDTO } from './dto/create-customer.dto';
import { UpdateResult } from 'typeorm';
export declare class CustomerService {
    private customerRepository;
    constructor(customerRepository: CustomerRepository);
    getCustomers(): Promise<Customer[]>;
    getCustomerById(customerId: number): Promise<any>;
    addCustomer(createCustomerDTO: CreateCustomerDTO): Promise<void>;
    updateCustomer(id: number, createCustomerDTO: CreateCustomerDTO): Promise<UpdateResult>;
    delete(id: number): Promise<any>;
}
