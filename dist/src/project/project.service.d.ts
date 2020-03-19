import { ProjectRepository } from './project.repository';
import { Project } from '../models/project.entity';
import { ProjectDTO } from './dto/project.dto';
import { UpdateResult } from 'typeorm';
import { Customer } from '../models/customer.entity';
export declare class ProjectService {
    private projectRepository;
    constructor(projectRepository: ProjectRepository);
    getProjects(): Promise<Project[]>;
    getProjectById(boardId: number): Promise<any>;
    addProject(projectDTO: ProjectDTO, customer: Customer): Promise<void>;
    updateProject(id: number, projectDTO: ProjectDTO): Promise<UpdateResult>;
    delete(id: number): Promise<any>;
}
