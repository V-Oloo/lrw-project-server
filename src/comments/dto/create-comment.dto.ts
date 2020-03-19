import {IsNotEmpty} from 'class-validator'
export class CommentDTO {

    @IsNotEmpty()
    comment: string;

    @IsNotEmpty()
    emp_id: number;

}