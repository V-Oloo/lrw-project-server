import { Controller, UsePipes, ValidationPipe, Post, Body, Get, ParseIntPipe, Param, Put, Delete, Patch, Query } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CreateCustomerDTO } from './dto/create-customer.dto';
import { Customer } from '../models/customer.entity';
import { EmployeeStatusValidationPipe } from 'src/employee/pipes/employee-status-validation';
import { EmployeeStatus } from 'src/employee/employee-status.enum';
import { GetCustomerFilterDto } from './dto/get-customer-filter.dto';

@Controller('customer')
export class CustomerController {
    constructor(private customerService: CustomerService) {}

    @Post('/addCustomer')
    // @UseGuards(AuthGuard())
    @UsePipes(ValidationPipe)
    addCustomer(
        @Body() createEmployeeDTO: CreateCustomerDTO,
        ): Promise<void> {
        return this.customerService.addCustomer(createEmployeeDTO);

    }

    @Get()
    // @UseGuards(AuthGuard())
    getcustomers( @Query(ValidationPipe) filterDto: GetCustomerFilterDto,): Promise<Customer[]> {
        return this.customerService.getCustomers(filterDto);
    }

    @Get('/:id')
    getCustomer(@Param('id', ParseIntPipe) customerId: number): Promise<Customer> {
        return this.customerService.getCustomerById(customerId);
    }

    @Put(':id/update')
    async update(@Param('id') id, @Body() createCustomerDTO: CreateCustomerDTO): Promise<any> {
        return this.customerService.updateCustomer(id, createCustomerDTO);
    } 

    @Patch('/:id/status')
    updateEmployeeStatus(
        @Param('id', ParseIntPipe) id: number, 
        @Body('status',EmployeeStatusValidationPipe ) status:EmployeeStatus ) {
        
         return this.customerService.updateStatus(id, status);
    }
}
