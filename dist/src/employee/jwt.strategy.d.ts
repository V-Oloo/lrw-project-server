import { JwtPayload } from './jwt-payload.interface';
import { EmployeeRepository } from './employee.repository';
import { Employee } from '../models/employee.entity';
declare const JwtStartegy_base: new (...args: any[]) => any;
export declare class JwtStartegy extends JwtStartegy_base {
    private employeeRepository;
    constructor(employeeRepository: EmployeeRepository);
    validate(payload: JwtPayload): Promise<Employee>;
}
export {};
