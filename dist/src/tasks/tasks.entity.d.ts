import { BaseEntity } from "typeorm";
import { TaskStatus } from "./task-status.enum";
import { Project } from "../project/project.entity";
export declare class Task extends BaseEntity {
    id: number;
    name: string;
    description: string;
    expectedStartDate: string;
    expectedEndDate: string;
    assignedEmployees: string[];
    status: TaskStatus;
    project: Project;
    createDateTime: Date;
    lastChangedDateTime: Date;
}
