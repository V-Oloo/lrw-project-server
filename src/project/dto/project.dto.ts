import {IsNotEmpty} from 'class-validator'
export class ProjectDTO {

    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    description: string;

    @IsNotEmpty()
    startDate: string;

    @IsNotEmpty()
    endDate: string;

}