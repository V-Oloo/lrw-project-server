import { IsNotEmpty, IsArray} from 'class-validator';
export class TaskDTO {

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
    createdBy: number;

    @IsNotEmpty()
    @IsArray()
    flaggers: string[];
}
