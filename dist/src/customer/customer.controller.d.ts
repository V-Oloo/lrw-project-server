import { CustomerService } from './customer.service';
import { CreateCustomerDTO } from './dto/create-customer.dto';
import { Customer } from '../models/customer.entity';
export declare class CustomerController {
    private customerService;
    constructor(customerService: CustomerService);
    addEmployee(createEmployeeDTO: CreateCustomerDTO): Promise<void>;
    getEmployees(): Promise<Customer[]>;
    getEmployee(customerId: number): Promise<Customer>;
    update(id: any, createCustomerDTO: CreateCustomerDTO): Promise<any>;
    delete(id: number): Promise<any>;
}
