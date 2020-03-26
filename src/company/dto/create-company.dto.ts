import {IsNotEmpty} from 'class-validator'
export class CreateCompanyDTO {

    @IsNotEmpty()
    organization: string;

    @IsNotEmpty()
    contact_person: string;

    @IsNotEmpty()
    phone: string;

    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    address: string;

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