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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const employees_service_1 = require("./employees.service");
const create_employee_dto_1 = require("./dto/create-employee.dto");
const auth_credentials_dto_1 = require("./dto/auth-credentials.dto");
const create_password_dto_1 = require("./dto/create-password.dto");
const change_password_dto_1 = require("./dto/change-password.dto");
const passport_1 = require("@nestjs/passport");
const get_customer_decorator_1 = require("../project/decorators/get-customer.decorator");
let EmployeesController = class EmployeesController {
    constructor(employeeService) {
        this.employeeService = employeeService;
    }
    addEmployee(createEmployeeDTO) {
        return this.employeeService.addEmployee(createEmployeeDTO);
    }
    createPassword(id, createPasswordDTO) {
        return this.employeeService.createPassword(id, createPasswordDTO);
    }
    getEmployees() {
        return this.employeeService.getEmployees();
    }
    getEmployee(employeeId) {
        return this.employeeService.getEmployeeById(employeeId);
    }
    async update(id, createEmployeeDTO) {
        return this.employeeService.updateEmployee(id, createEmployeeDTO);
    }
    login(authCredentialsDto) {
        return this.employeeService.login(authCredentialsDto);
    }
    changePassword(id, changePasswordDTO) {
        return this.employeeService.changePassword(id, changePasswordDTO);
    }
    async delete(id) {
        return this.employeeService.delete(id);
    }
    test(project) {
        console.log(project);
    }
};
__decorate([
    common_1.Post('/addEmployee'),
    common_1.UseGuards(passport_1.AuthGuard()),
    common_1.UsePipes(common_1.ValidationPipe),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_employee_dto_1.CreateEmployeeDTO]),
    __metadata("design:returntype", Promise)
], EmployeesController.prototype, "addEmployee", null);
__decorate([
    common_1.Patch('/:id/createPassword'),
    common_1.UsePipes(common_1.ValidationPipe),
    __param(0, common_1.Param('id', common_1.ParseIntPipe)), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_password_dto_1.CreatePasswordDTO]),
    __metadata("design:returntype", void 0)
], EmployeesController.prototype, "createPassword", null);
__decorate([
    common_1.Get(),
    common_1.UseGuards(passport_1.AuthGuard()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], EmployeesController.prototype, "getEmployees", null);
__decorate([
    common_1.Get('/:id'),
    common_1.UseGuards(passport_1.AuthGuard()),
    __param(0, common_1.Param('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], EmployeesController.prototype, "getEmployee", null);
__decorate([
    common_1.Put(':id/update'),
    common_1.UseGuards(passport_1.AuthGuard()),
    __param(0, common_1.Param('id')), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_employee_dto_1.CreateEmployeeDTO]),
    __metadata("design:returntype", Promise)
], EmployeesController.prototype, "update", null);
__decorate([
    common_1.Post('/login'),
    __param(0, common_1.Body(common_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_credentials_dto_1.AuthCredentialsDto]),
    __metadata("design:returntype", Promise)
], EmployeesController.prototype, "login", null);
__decorate([
    common_1.Patch('/:userId/changePassword'),
    __param(0, common_1.Param('userId', common_1.ParseIntPipe)), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, change_password_dto_1.ChangePasswordDTO]),
    __metadata("design:returntype", void 0)
], EmployeesController.prototype, "changePassword", null);
__decorate([
    common_1.Delete(':id/delete'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], EmployeesController.prototype, "delete", null);
__decorate([
    common_1.Post('/test/:id'),
    common_1.UseGuards(passport_1.AuthGuard()),
    __param(0, get_customer_decorator_1.GetCustomer()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], EmployeesController.prototype, "test", null);
EmployeesController = __decorate([
    common_1.Controller('employees'),
    __metadata("design:paramtypes", [employees_service_1.EmployeesService])
], EmployeesController);
exports.EmployeesController = EmployeesController;
//# sourceMappingURL=employees.controller.js.map