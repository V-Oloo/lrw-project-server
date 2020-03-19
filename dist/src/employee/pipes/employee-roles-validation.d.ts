import { PipeTransform } from '@nestjs/common';
import { EmployeeRoles } from '../employee-roles.enum';
export declare class TaskStatusValidationPipe implements PipeTransform {
    readonly allowedStatuses: EmployeeRoles[];
    transform(value: any): any;
    private isStatusValid;
}
