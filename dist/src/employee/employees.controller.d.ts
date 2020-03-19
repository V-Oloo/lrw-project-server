import { EmployeesService } from './employees.service';
import { CreateEmployeeDTO } from './dto/create-employee.dto';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { Employee } from '../models/employee.entity';
import { CreatePasswordDTO } from './dto/create-password.dto';
import { ChangePasswordDTO } from './dto/change-password.dto';
export declare class EmployeesController {
    private employeeService;
    constructor(employeeService: EmployeesService);
    addEmployee(createEmployeeDTO: CreateEmployeeDTO): Promise<void>;
    createPassword(id: any, createPasswordDTO: CreatePasswordDTO): Promise<any>;
    getEmployees(): Promise<Employee[]>;
    getEmployee(employeeId: number): Promise<Employee>;
    update(id: any, createEmployeeDTO: CreateEmployeeDTO): Promise<any>;
    login(authCredentialsDto: AuthCredentialsDto): Promise<{
        accessToken: string;
    }>;
    changePassword(id: any, changePasswordDTO: ChangePasswordDTO): Promise<any>;
    delete(id: number): Promise<any>;
    test(project: any): void;
}
