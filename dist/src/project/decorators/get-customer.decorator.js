"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const customer_entity_1 = require("../../models/customer.entity");
exports.GetCustomer = common_1.createParamDecorator(async (data, req) => {
    const customerId = +req.params.id;
    const projectRepository = typeorm_1.getRepository(customer_entity_1.Customer);
    const customer = await projectRepository.findOne(customerId);
    return customer;
});
//# sourceMappingURL=get-customer.decorator.js.map