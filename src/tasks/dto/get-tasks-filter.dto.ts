
import { IsOptional, IsIn, IsNotEmpty } from 'class-validator';
import { TaskStatus } from '../task-status.enum';
export class GetTaskFilterDto {

    @IsOptional()
    @IsIn([TaskStatus.APPROVED, TaskStatus.IN_PROGRESS, TaskStatus.OPEN, TaskStatus.CANCELLED, TaskStatus.COMPLETE])
    status: TaskStatus;

    @IsOptional()
    @IsNotEmpty()
    search: string;
}
