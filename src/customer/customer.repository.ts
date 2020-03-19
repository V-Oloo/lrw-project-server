import { Repository, EntityRepository, UpdateResult } from "typeorm";
import { Customer } from "../models/customer.entity";
import { CreateCustomerDTO } from "./dto/create-customer.dto";
import { ConflictException, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { EmployeeStatus } from "src/employee/employee-status.enum";
import { GetCustomerFilterDto } from "./dto/get-customer-filter.dto";


@EntityRepository(Customer)
export class CustomerRepository extends Repository<Customer> {

    async getCustomers(filterDto: GetCustomerFilterDto): Promise<Customer[]> {
        const {status} = filterDto
        
        const query = this.createQueryBuilder('customer');

        query.getMany();

        if (status) {
            query.andWhere('customer.status = :status', {status});
        }

        const customers = await query.getMany();
        return customers;
    }

    async addCustomer(createCustomerDTO: CreateCustomerDTO): Promise<void> {
        const {phone, email, contactPerson, organization, address,phonePrefix } = createCustomerDTO; 

            const customer = new Customer();
            customer.phonePrefix = phonePrefix;
            customer.phone = phone;
            customer.email = email;
            customer.organization = organization;
            customer.address = address;
            customer.contactPerson = contactPerson;
            customer.address = address;
           
            try {
                 await customer.save();
            } catch (error) {
                if (error.code === '23505'){
                    throw new ConflictException('email address already exist');
                }else {
                     throw new InternalServerErrorException();
                }
                
            }
        
    }

    async updateCustomer( id: number, createCustomerDTO: CreateCustomerDTO): Promise<UpdateResult> {
        return await this.update(id, createCustomerDTO);
    }

    async updateStatus(id: number, status: EmployeeStatus) {
        const customer = await this.findOne(id);
        if (!customer) {
            throw new NotFoundException(`Customer not found`);
       }

       customer.status = status;
       customer.save();

    }

}