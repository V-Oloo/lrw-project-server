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
const typeorm_1 = require("@nestjs/typeorm");
const employee_repository_1 = require("./employee.repository");
const jwt_1 = require("@nestjs/jwt");
let EmployeesService = class EmployeesService {
    constructor(employeeRepository, jwtService) {
        this.employeeRepository = employeeRepository;
        this.jwtService = jwtService;
    }
    async getEmployees() {
        return this.employeeRepository.getEmployees();
    }
    async getEmployeeById(employeeId) {
        const user = await this.employeeRepository.findOne(employeeId);
        if (!user) {
            throw new common_1.HttpException('No employee with the given id was found', common_1.HttpStatus.NOT_FOUND);
        }
        const userData = {
            email: user.email,
            phone: user.phone,
            firstname: user.firstname,
            lastname: user.lastname,
            address: user.address,
            jobTitle: user.jobTitle,
            department: user.department,
        };
        return userData;
    }
    async addEmployee(createEmployeeDTO) {
        return this.employeeRepository.addEmployee(createEmployeeDTO);
    }
    async updateEmployee(id, createEmployeeDTO) {
        return await this.employeeRepository.updateEmployee(id, createEmployeeDTO);
    }
    async getCompanyEmployees(companyId) {
        return this.employeeRepository.getCompanyEmployees(companyId);
    }
    async createPassword(id, createPasswordDTO) {
        const result = await this.employeeRepository.updateUserPassword(id, createPasswordDTO);
        return result;
    }
    async changePassword(id, changePasswordDTO) {
        const result = await this.employeeRepository.changePassword(id, changePasswordDTO);
        return result;
    }
    async login(authCredentialsDto) {
        const employee = await this.employeeRepository.validateUserPassword(authCredentialsDto);
        if (!employee) {
            throw new common_1.UnauthorizedException('Invalid user credentials');
        }
        const payload = employee;
        const accessToken = await this.jwtService.sign(payload);
        return { accessToken };
    }
    async delete(id) {
        const result = await this.employeeRepository.delete(id);
        if (result.affected === 0) {
            throw new common_1.HttpException('User Not Found', common_1.HttpStatus.NOT_FOUND);
        }
        return result;
    }
};
EmployeesService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(employee_repository_1.EmployeeRepository)),
    __metadata("design:paramtypes", [employee_repository_1.EmployeeRepository,
        jwt_1.JwtService])
], EmployeesService);
exports.EmployeesService = EmployeesService;
//# sourceMappingURL=employees.service.js.map