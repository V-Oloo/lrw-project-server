"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const customer_repository_1 = require("./customer.repository");
let CustomerService = class CustomerService {
    constructor(customerRepository) {
        this.customerRepository = customerRepository;
    }
    async getCustomers() {
        return this.customerRepository.getCustomers();
    }
    async getCustomerById(customerId) {
        const customer = await this.customerRepository.findOne(customerId);
        if (!customer) {
            throw new common_1.HttpException('No customer with the given id was found', common_1.HttpStatus.NOT_FOUND);
        }
        const customerData = {
            email: customer.email,
            phone: customer.phone,
            contactPerson: customer.contactPerson,
            organization: customer.organization,
            address: customer.address,
        };
        return customerData;
    }
    async addCustomer(createCustomerDTO) {
        return this.customerRepository.addCustomer(createCustomerDTO);
    }
    async updateCustomer(id, createCustomerDTO) {
        return await this.customerRepository.updateCustomer(id, createCustomerDTO);
    }
    async delete(id) {
        const result = await this.customerRepository.delete(id);
        if (result.affected === 0) {
            throw new common_1.HttpException('Customer Not Found', common_1.HttpStatus.NOT_FOUND);
        }
        return result;
    }
};
CustomerService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [customer_repository_1.CustomerRepository])
], CustomerService);
exports.CustomerService = CustomerService;
//# sourceMappingURL=customer.service.js.map