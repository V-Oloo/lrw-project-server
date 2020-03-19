import { BaseEntity } from "typeorm";
import { Task } from "./tasks.entity";
export declare class Comments extends BaseEntity {
    id: number;
    user: string;
    comment: string;
    task: Task;
    createDateTime: Date;
}
