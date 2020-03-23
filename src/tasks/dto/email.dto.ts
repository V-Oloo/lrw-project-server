import { IsNotEmpty } from 'class-validator';

export class EmailDto {
    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    address: string;

    @IsNotEmpty()
    start: string;

    @IsNotEmpty()
    end: string;

    @IsNotEmpty()
    org: string;

    @IsNotEmpty()
    name: string;

}