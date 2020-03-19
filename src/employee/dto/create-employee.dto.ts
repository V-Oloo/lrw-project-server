import {IsNotEmpty} from 'class-validator'
export class CreateEmployeeDTO {

    @IsNotEmpty()
    phonePrefix: string;

    @IsNotEmpty()
    phone: string;

    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    firstname: string;

    @IsNotEmpty()
    lastname: string;

    @IsNotEmpty()
    address: string;

    @IsNotEmpty()
    jobTitle: string;

}