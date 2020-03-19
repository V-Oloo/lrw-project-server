import { BaseEntity } from "typeorm";
import { Customer } from "./customer.entity";
export declare class Project extends BaseEntity {
    id: number;
    name: string;
    description: string;
    startDate: string;
    endDate: string;
    status: string;
    createAt: Date;
    lastUpdatedAt: Date;
    tasks: Project[];
    customer: Customer;
}
