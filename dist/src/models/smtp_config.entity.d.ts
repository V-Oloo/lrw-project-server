import { BaseEntity } from "typeorm";
export declare class SmtpConfig extends BaseEntity {
    id: number;
    host: string;
    port: string;
    username: string;
    password: string;
}
