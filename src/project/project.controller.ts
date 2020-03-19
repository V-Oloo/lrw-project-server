import { Controller, Post, ValidationPipe, UsePipes, Body, Get, Param, ParseIntPipe, Put, Delete, UseGuards, Query, Patch } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectDTO } from './dto/project.dto';
import { Project } from '../models/project.entity';
import { GetCustomer } from './decorators/get-customer.decorator';
import { Customer } from '../models/customer.entity';
import { AuthGuard } from '@nestjs/passport';
import { UpdateProjectDTO } from './dto/update-project.dto';
import { PagedResultDTO } from '../shared/pagedResult.dto';
import { EmployeeStatusValidationPipe } from 'src/employee/pipes/employee-status-validation';
import { EmployeeStatus } from '../employee/employee-status.enum';

@Controller('project')
@UseGuards(AuthGuard())
export class ProjectController {
    constructor(private boardService: ProjectService) {}

    @Post('/:id/addProject')
    @UsePipes(ValidationPipe)
    addBoard(
        @Body() projectDTO:ProjectDTO,
        @GetCustomer() customer: Customer
        ): Promise<void> {
        return this.boardService.addProject(projectDTO, customer);

    }

    @Get()
    getProjects(@Query(ValidationPipe) filterDto: PagedResultDTO): Promise<Project[]> {
        return this.boardService.getProjects(filterDto);
    }

    @Get('/dashboard/stats')
    getDashboardStats(): Promise<any> {
        return this.boardService.getDashboardStats();
    }

    @Get('/:id')
    getProject(@Param('id', ParseIntPipe) projectId: number): Promise<Project> {
        return this.boardService.getProjectById(projectId);
    }

    @Get('/:id/tasks')
    getProjectTasks(@Param('id', ParseIntPipe) projectId: number): Promise<Project> {
        return this.boardService.getProjectTasks(projectId);
    }

    @Get('/projectDetails/stat')
    async getProjectDetails(): Promise<any> {
        return this.boardService.getProjectDetails();
    }

    @Put(':id/update')
    async update(@Param('id') id, @Body() projectDTO:UpdateProjectDTO): Promise<any> {
        return this.boardService.updateProject(id, projectDTO);
    } 
    
    @Patch('/:id/status')
    updateEmployeeStatus(
        @Param('id', ParseIntPipe) id: number, 
        @Body('status',EmployeeStatusValidationPipe ) status:EmployeeStatus ) {
        
         return this.boardService.updateStatus(id, status);
    }
}
