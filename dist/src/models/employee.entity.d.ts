import { BaseEntity } from "typeorm";
export declare class Employee extends BaseEntity {
    id: number;
    firstname: string;
    lastname: string;
    phone: string;
    email: string;
    address: string;
    department: string;
    jobTitle: string;
    password: string;
    salt: string;
    status: string;
    createdBy: string;
    createDateTime: Date;
    lastChangedDateTime: Date;
    validatePassword(password: string): Promise<boolean>;
}
