import { BaseEntity } from "typeorm";
import { Project } from "src/project/project.entity";
export declare class Customer extends BaseEntity {
    id: number;
    organization: string;
    contactPerson: string;
    phone: string;
    email: string;
    address: string;
    project: Project[];
    createDateTime: Date;
    lastChangedDateTime: Date;
}
