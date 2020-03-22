import { IsNotEmpty, IsArray} from 'class-validator';
export class TaskDTO {

    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    description: string;

    @IsNotEmpty()
    plannedStartDate: string;

    @IsNotEmpty()
    plannedEndDate: string;

    @IsNotEmpty()
    street: string;

    @IsNotEmpty()
    state: string;

    @IsNotEmpty()
    city: string;

    @IsNotEmpty()
    zipCode: string;

    @IsNotEmpty()
    @IsArray()
    assignedEmployees: string[];
}
