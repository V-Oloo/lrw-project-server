import { BaseEntity } from "typeorm";
import { Project } from "./project.entity";
import { Comments } from "./comments.entity";
export declare class Task extends BaseEntity {
    id: number;
    name: string;
    description: string;
    expectedStartDate: string;
    expectedEndDate: string;
    assignedEmployees: string[];
    status: string;
    project: Project;
    comments: Comments[];
    createDateTime: Date;
    lastChangedDateTime: Date;
}
