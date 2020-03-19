"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
exports.GetCompanyId = common_1.createParamDecorator((data, req) => {
    return data ? req.user && req.user[data] : req.user;
});
//# sourceMappingURL=get-companyId.decorator.js.map