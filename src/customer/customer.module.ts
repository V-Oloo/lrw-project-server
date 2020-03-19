import { Module } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerController } from './customer.controller';
import { Customer } from '../models/customer.entity';
import { CustomerRepository } from './customer.repository';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([Customer,CustomerRepository]),
  ],
  providers: [CustomerService],
  controllers: [CustomerController]
})
export class CustomerModule {}
