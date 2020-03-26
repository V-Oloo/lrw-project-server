import { IsNotEmpty } from 'class-validator';

export class NotificationDto {
    @IsNotEmpty()
    event: string;

    @IsNotEmpty()
    message: string;

    @IsNotEmpty()
    user: number;

    @IsNotEmpty()
    status: string;
}