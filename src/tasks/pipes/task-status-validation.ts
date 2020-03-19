import { PipeTransform, BadRequestException } from '@nestjs/common';
import { TaskStatus } from '../task-status.enum';

export class TaskStatusValidationPipe implements PipeTransform {
    readonly allowedStatuses = [
        TaskStatus.OPEN,
        TaskStatus.IN_PROGRESS,
        TaskStatus.CANCELLED,
        TaskStatus.COMPLETE,
        TaskStatus.APPROVED
    ];
    // value is the user status input which is of type any since we dont know what the user will input
    transform(value: any) {
        value = value.toUpperCase();
        // checks if user input is an indexOf allowed status if not throws an error
        if (!this.isStatusValid(value)) {
            throw new BadRequestException(`"${value}" is an invalid status`);
        }
        return value;
    }

    private isStatusValid(status: any) {
        // indexOf will return -1 if what people write is nt in the allowed status array
       const idx = this.allowedStatuses.indexOf(status);
       return idx !== -1;
    }
}
