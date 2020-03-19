
import { IsOptional } from 'class-validator';
export class GetCustomerFilterDto {

    @IsOptional()
    status: string;
}
