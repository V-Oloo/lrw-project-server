"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const bcrypt = require("bcrypt");
const common_1 = require("@nestjs/common");
const employee_entity_1 = require("../models/employee.entity");
let EmployeeRepository = class EmployeeRepository extends typeorm_1.Repository {
    async getEmployees() {
        const query = this.createQueryBuilder('employee');
        const employee = await query.getMany();
        return employee;
    }
    async addEmployee(createEmployeeDTO) {
        const { phone, email, firstname, lastname, jobTitle, department, address } = createEmployeeDTO;
        const employee = new employee_entity_1.Employee();
        employee.phone = phone;
        employee.email = email;
        employee.firstname = firstname;
        employee.lastname = lastname;
        employee.jobTitle = jobTitle;
        employee.department = department;
        employee.address = address;
        employee.createdBy = "Admin";
        try {
            await employee.save();
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
    async updateEmployee(id, createEmployeeDTO) {
        return await this.update(id, createEmployeeDTO);
    }
    async getCompanyEmployees(companyId) {
        const employees = this.createQueryBuilder('employees')
            .where('employees.companyId = :companyId', { companyId: companyId })
            .getMany();
        return employees;
    }
    async updateUserPassword(id, createPasswordDTO) {
        const { password } = createPasswordDTO;
        const salt = await bcrypt.genSalt();
        const pass = await this.hashPassword(password, salt);
        const result = this.createQueryBuilder()
            .update(employee_entity_1.Employee)
            .set({ password: pass, salt: salt, status: "ACTIVE" })
            .where("id = :id", { id: id }).execute();
        return result;
    }
    async changePassword(id, changePasswordDTO) {
        const { oldPassword, newPassword } = changePasswordDTO;
        const user = await this.findOne(id);
        if (user) {
            const oldSalt = user.salt;
            const inputPass = await this.hashPassword(oldPassword, oldSalt);
            const oldPass = user.password;
            if (inputPass === oldPass) {
                const salt = await bcrypt.genSalt();
                const pass = await this.hashPassword(newPassword, salt);
                const result = this.createQueryBuilder()
                    .update(employee_entity_1.Employee)
                    .set({ password: pass, salt: salt })
                    .where("id = :id", { id: id }).execute();
                return result;
            }
            throw new common_1.HttpException('old password do not match', common_1.HttpStatus.NOT_FOUND);
        }
        else {
            throw new common_1.HttpException('User Not Found', common_1.HttpStatus.NOT_FOUND);
        }
    }
    async validateUserPassword(authCredentialsDto) {
        const { email, password } = authCredentialsDto;
        const user = await this.findOne({ email });
        if (user && await user.validatePassword(password)) {
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
        else {
            return null;
        }
    }
    async delete(id) {
        const query = this.createQueryBuilder()
            .delete().from(employee_entity_1.Employee)
            .where("id = :id", { id: id })
            .execute();
        return query;
    }
    async hashPassword(password, salt) {
        return bcrypt.hash(password, salt);
    }
};
EmployeeRepository = __decorate([
    typeorm_1.EntityRepository(employee_entity_1.Employee)
], EmployeeRepository);
exports.EmployeeRepository = EmployeeRepository;
//# sourceMappingURL=employee.repository.js.map