import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CustomerRepository } from './customer.repository';
import { Customer } from '../models/customer.entity';
import { CreateCustomerDTO } from './dto/create-customer.dto';
import { UpdateResult } from 'typeorm';
import { EmployeeStatus } from 'src/employee/employee-status.enum';
import { GetCustomerFilterDto } from './dto/get-customer-filter.dto';

@Injectable()
export class CustomerService {
    constructor(
        private customerRepository: CustomerRepository,
        ) {}

    async getCustomers(filterDto: GetCustomerFilterDto): Promise<Customer[]> {
        return this.customerRepository.getCustomers(filterDto);
    }
    
    async getCustomerById(customerId: number): Promise<any> {
        const customer = await this.customerRepository.findOne(customerId);

        if (!customer) {
            throw new HttpException('No customer with the given id was found', HttpStatus.NOT_FOUND);
        }

        return customer.toResponseObject();

    }  
    
    async addCustomer(createCustomerDTO: CreateCustomerDTO): Promise<void> {
        return this.customerRepository.addCustomer(createCustomerDTO);
    }

    async updateCustomer(id: number, createCustomerDTO: CreateCustomerDTO): Promise<UpdateResult> {
        return await this.customerRepository.updateCustomer(id, createCustomerDTO);
    }

    async updateStatus(id: number, status: EmployeeStatus) {
        return this.customerRepository.updateStatus(id, status);
    }
}
