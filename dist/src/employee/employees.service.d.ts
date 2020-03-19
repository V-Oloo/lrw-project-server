import { EmployeeRepository } from './employee.repository';
import { CreateEmployeeDTO } from './dto/create-employee.dto';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { JwtService } from '@nestjs/jwt';
import { Employee } from '../models/employee.entity';
import { UpdateResult } from 'typeorm';
import { CreatePasswordDTO } from './dto/create-password.dto';
import { ChangePasswordDTO } from './dto/change-password.dto';
export declare class EmployeesService {
    private employeeRepository;
    private jwtService;
    constructor(employeeRepository: EmployeeRepository, jwtService: JwtService);
    getEmployees(): Promise<Employee[]>;
    getEmployeeById(employeeId: number): Promise<any>;
    addEmployee(createEmployeeDTO: CreateEmployeeDTO): Promise<void>;
    updateEmployee(id: number, createEmployeeDTO: CreateEmployeeDTO): Promise<UpdateResult>;
    getCompanyEmployees(companyId: number): Promise<Employee[]>;
    createPassword(id: number, createPasswordDTO: CreatePasswordDTO): Promise<any>;
    changePassword(id: number, changePasswordDTO: ChangePasswordDTO): Promise<any>;
    login(authCredentialsDto: AuthCredentialsDto): Promise<{
        accessToken: string;
    }>;
    delete(id: number): Promise<any>;
}
