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

    @IsNotEmpty()
    cone_rate: number;

    @IsNotEmpty()
    flagger_rate: number;

    @IsNotEmpty()
    sign_rate: number;

    @IsNotEmpty()
    boards_rate: number;

    @IsNotEmpty()
    min_hours: string;

}