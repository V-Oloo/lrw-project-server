"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const employee_roles_enum_1 = require("../employee-roles.enum");
class TaskStatusValidationPipe {
    constructor() {
        this.allowedStatuses = [
            employee_roles_enum_1.EmployeeRoles.ADMIN,
            employee_roles_enum_1.EmployeeRoles.SUPERVISOR,
            employee_roles_enum_1.EmployeeRoles.TECHNICIAN,
        ];
    }
    transform(value) {
        value = value.toUpperCase();
        if (!this.isStatusValid(value)) {
            throw new common_1.BadRequestException(`"${value}" is an invalid status`);
        }
        return value;
    }
    isStatusValid(status) {
        const idx = this.allowedStatuses.indexOf(status);
        return idx !== -1;
    }
}
exports.TaskStatusValidationPipe = TaskStatusValidationPipe;
//# sourceMappingURL=employee-roles-validation.js.map