import { PipeTransform, BadRequestException } from '@nestjs/common';
import { EmployeeStatus } from '../employee-status.enum';


export class EmployeeStatusValidationPipe implements PipeTransform {
    readonly allowedStatuses = [
       EmployeeStatus.ACTIVE,
       EmployeeStatus.INACTIVE,
       EmployeeStatus.DELETED
    ];

    transform(value: any) {
        value = value.toUpperCase();
      
        if (!this.isStatusValid(value)) {
            throw new BadRequestException(`"${value}" is an invalid status`);
        }
        return value;
    }

    private isStatusValid(status: any) {
       const idx = this.allowedStatuses.indexOf(status);
       return idx !== -1;
    }
}
