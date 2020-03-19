import { ProjectService } from './project.service';
import { ProjectDTO } from './dto/project.dto';
import { Project } from '../models/project.entity';
import { Customer } from '../models/customer.entity';
export declare class ProjectController {
    private boardService;
    constructor(boardService: ProjectService);
    addBoard(projectDTO: ProjectDTO, customer: Customer): Promise<void>;
    getProjects(): Promise<Project[]>;
    getProject(projectId: number): Promise<Project>;
    update(id: any, projectDTO: ProjectDTO): Promise<any>;
    delete(id: number): Promise<any>;
}
