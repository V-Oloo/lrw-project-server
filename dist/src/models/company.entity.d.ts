import { BaseEntity } from "typeorm";
export declare class Company extends BaseEntity {
    id: number;
    organization: string;
    contact_person: string;
    phone: string;
    email: string;
    address: string;
}
