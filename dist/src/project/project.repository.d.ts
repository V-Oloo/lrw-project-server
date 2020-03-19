import { Repository, UpdateResult } from "typeorm";
import { Project } from "../models/project.entity";
import { ProjectDTO } from "./dto/project.dto";
import { Customer } from "../models/customer.entity";
export declare class ProjectRepository extends Repository<Project> {
    getProjects(): Promise<Project[]>;
    addProject(projectDTO: ProjectDTO, customer: Customer): Promise<void>;
    updateProject(id: number, projectDTO: ProjectDTO): Promise<UpdateResult>;
    delete(id: number): Promise<any>;
}
