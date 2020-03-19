import { Repository, UpdateResult } from "typeorm";
import { CreateEmployeeDTO } from "./dto/create-employee.dto";
import { AuthCredentialsDto } from "./dto/auth-credentials.dto";
import { CreatePasswordDTO } from "./dto/create-password.dto";
import { ChangePasswordDTO } from "./dto/change-password.dto";
import { Employee } from "../models/employee.entity";
export declare class EmployeeRepository extends Repository<Employee> {
    getEmployees(): Promise<Employee[]>;
    addEmployee(createEmployeeDTO: CreateEmployeeDTO): Promise<void>;
    updateEmployee(id: number, createEmployeeDTO: CreateEmployeeDTO): Promise<UpdateResult>;
    getCompanyEmployees(companyId: number): Promise<Employee[]>;
    updateUserPassword(id: number, createPasswordDTO: CreatePasswordDTO): Promise<any>;
    changePassword(id: number, changePasswordDTO: ChangePasswordDTO): Promise<UpdateResult>;
    validateUserPassword(authCredentialsDto: AuthCredentialsDto): Promise<any>;
    delete(id: number): Promise<any>;
    private hashPassword;
}
