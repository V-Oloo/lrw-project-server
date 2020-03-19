"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const customer_entity_1 = require("../models/customer.entity");
const common_1 = require("@nestjs/common");
let CustomerRepository = class CustomerRepository extends typeorm_1.Repository {
    async getCustomers() {
        const query = this.createQueryBuilder('customer');
        const customers = await query.getMany();
        return customers;
    }
    async addCustomer(createCustomerDTO) {
        const { phone, email, contactPerson, organization, address } = createCustomerDTO;
        const customer = new customer_entity_1.Customer();
        customer.phone = phone;
        customer.email = email;
        customer.organization = organization;
        customer.address = address;
        customer.contactPerson = contactPerson;
        customer.address = address;
        try {
            await customer.save();
        }
        catch (error) {
            if (error.code === '23505') {
                throw new common_1.ConflictException('email address already exist');
            }
            else {
                throw new common_1.InternalServerErrorException();
            }
        }
    }
    async updateCustomer(id, createCustomerDTO) {
        return await this.update(id, createCustomerDTO);
    }
    async delete(id) {
        const query = this.createQueryBuilder()
            .delete().from(customer_entity_1.Customer)
            .where("id = :id", { id: id })
            .execute();
        return query;
    }
};
CustomerRepository = __decorate([
    typeorm_1.EntityRepository(customer_entity_1.Customer)
], CustomerRepository);
exports.CustomerRepository = CustomerRepository;
//# sourceMappingURL=customer.repository.js.map