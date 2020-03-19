import {IsNotEmpty, IsString, MinLength} from 'class-validator'
export class CreatePasswordDTO {

    @IsNotEmpty()
    @IsString()
    @MinLength(8)
    password: string;

}