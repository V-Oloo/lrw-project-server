import {IsNotEmpty} from 'class-validator'
export class CreateCustomerDTO {

    @IsNotEmpty()
    phonePrefix: string;
    
    @IsNotEmpty()
    phone: string;

    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    contactPerson: string;

    @IsNotEmpty()
    organization: string;

    @IsNotEmpty()
    state: string;

    @IsNotEmpty()
    street: string;

    @IsNotEmpty()
    zipCode: string;

    @IsNotEmpty()
    city: string;

}