import { IsNotEmpty, IsArray} from 'class-validator';
export class TaskDTO {

    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    description: string;

    @IsNotEmpty()
    expectedStartDate: string;

    @IsNotEmpty()
    expectedEndDate: string;

    @IsNotEmpty()
    @IsArray()
    assignedEmployees: string[];
}
