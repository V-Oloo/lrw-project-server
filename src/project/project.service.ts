import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { ProjectRepository } from './project.repository';
import { Project } from '../models/project.entity';
import { ProjectDTO } from './dto/project.dto';
import { UpdateResult } from 'typeorm';
import { Customer } from '../models/customer.entity';
import { UpdateProjectDTO } from './dto/update-project.dto';
import { PagedResultDTO } from 'src/shared/pagedResult.dto';
import { EmployeeStatus } from 'src/employee/employee-status.enum';

@Injectable()
export class ProjectService {
    constructor(
        private projectRepository: ProjectRepository,
        ) {}

    async getProjects(filterDto: PagedResultDTO): Promise<Project[]> {
        return this.projectRepository.getProjects(filterDto);
    }

    async getProjectTasks(projectId: number): Promise<Project> {
        return this.projectRepository.getProjectTasks(projectId);
    }

    async getProjectDetails() {
        return this.projectRepository.getProjectTableDetails();
    }

    async getDashboardStats(): Promise<any> {
        return this.projectRepository.dashboardStats();
    }
    
    async getProjectById(projectId: number): Promise<any> {
        return this.projectRepository.getProjectById(projectId);

    }  
    
    async addProject(projectDTO: ProjectDTO, customer: Customer): Promise<void> {
        return this.projectRepository.addProject(projectDTO, customer);
    }

    async updateProject(id: number, projectDTO: UpdateProjectDTO): Promise<UpdateResult> {
        return await this.projectRepository.updateProject(id, projectDTO);
    }

    async updateStatus(id: number, status: EmployeeStatus) {
        return this.projectRepository.updateStatus(id, status);
    }
}
