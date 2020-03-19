import { Repository, UpdateResult } from "typeorm";
import { Customer } from "../models/customer.entity";
import { CreateCustomerDTO } from "./dto/create-customer.dto";
export declare class CustomerRepository extends Repository<Customer> {
    getCustomers(): Promise<Customer[]>;
    addCustomer(createCustomerDTO: CreateCustomerDTO): Promise<void>;
    updateCustomer(id: number, createCustomerDTO: CreateCustomerDTO): Promise<UpdateResult>;
    delete(id: number): Promise<any>;
}
