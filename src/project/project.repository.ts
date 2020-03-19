import { Employee } from '../models/employee.entity';
import { Repository, EntityRepository, UpdateResult, getManager, getRepository } from "typeorm";
import { Project } from "../models/project.entity";
import { ProjectDTO } from "./dto/project.dto";
import { Customer } from "../models/customer.entity";
import { UpdateProjectDTO } from "./dto/update-project.dto";
import { PagedResultDTO } from "../shared/pagedResult.dto";
import { EmployeeStatus } from 'src/employee/employee-status.enum';
import { NotFoundException } from '@nestjs/common';


@EntityRepository(Project)
export class ProjectRepository extends Repository<Project> {

    async getProjects(filterDto: PagedResultDTO): Promise<any> {
        let { currentPage, pageSize, searchTerm } = filterDto

        currentPage = 1;
        pageSize = 100;

        const page = (currentPage - 1) < 0 ? 0 : currentPage - 1;
        const skip = page * pageSize;

        const query = this.createQueryBuilder('project')
        .andWhere("project.status != 'DELETED'");
        if(typeof searchTerm!='undefined' && searchTerm){
          query.andWhere("project.name like :searchTerm", {searchTerm: `%${searchTerm}%` }); //TODO=>ADD PROJECT PROPERTIES THAT CAN BE SEARCHED HERE
        }
        const totalrecords=await query.getCount();
        const dataset =await query.orderBy('project.createAt') //add order by property here
                            .skip(skip)
                            .take(pageSize)
                            .getMany();
           const result= new PagedResultDTO(dataset,pageSize,currentPage,totalrecords);
           return result;

    }

    async addProject(projectDTO: ProjectDTO, customer: Customer): Promise<void> {
        const {name, description, startDate,endDate } = projectDTO; 

            const project = new Project();
            project.name = name;
            project.description = description;
            project.startDate = startDate;
            project.endDate = endDate;
            project.status = "OPEN";
            project.customer = customer
            await project.save();
        
    }

    async updateProject( id: number, projectDTO: UpdateProjectDTO): Promise<UpdateResult> {
        const {name, description, startDate, endDate, customerId} = projectDTO

        const customer = await getRepository(Customer).findOne(customerId);

        const project = await this.findOne(id);
         if(Project) {
            const result = this.createQueryBuilder().update()
            .set({name: name, description: description, startDate: startDate, endDate: endDate, customer: customer})
            .where("id = :id", {id:id}).execute();

            return result;       
         }
        return await this.update(id, projectDTO);
    }

    async updateStatus(id: number, status: EmployeeStatus) {
        const project = await this.findOne(id);
        if (!project) {
            throw new NotFoundException(`Project not found`);
       }

       project.status = status;
       project.save();

    }


    async getProjectTasks(id: number){
        const project = await this.createQueryBuilder("project")
                .leftJoinAndSelect("project.tasks", "task")
                .where("project.id = :id", { id: id })
                .getOne();

        return project;        
    }

    async getProjectTableDetails() {
        const details = await this.createQueryBuilder("project")
                                  .leftJoin('project.tasks', 'tasks')
                                  .leftJoin('project.customer', 'customer')
                                  .select('project.name', 'name')
                                  .addSelect('project.id', 'projectId')
                                  .addSelect('project.endDate', 'dueDate')
                                  .addSelect('project.status', 'status')
                                  .addSelect('customer.organization', 'customers')
                                  .addSelect('COUNT(DISTINCT(tasks.id)) as tasks')
                                  .groupBy('project.id')
                                  .addGroupBy('customer.organization')
                                  .getRawMany();

         return details;                     
    }

    async dashboardStats(): Promise<any> {

            const test1=await  this.query('SELECT count(*) FROM project');
            const test2=await  this.query('SELECT count(*) FROM employee');
            const test3=await  this.query('SELECT count(*) FROM task');

            const res={projects:test1,employees:test2,tasks:test3};

        return res;                        
    }

    async getProjectById(projectId: number): Promise<any> {
        const project = await this.createQueryBuilder('p')
                                   .innerJoinAndSelect('p.customer', 'c')
                                   .select('p.id', 'project_id')
                                   .addSelect('p.name', 'name')
                                   .addSelect('p.description', 'description')
                                   .addSelect('p.status', 'status')
                                   .addSelect('p.startDate', 'startDate')
                                   .addSelect('p.endDate', 'endDate')
                                   .addSelect('c.id','customerId')
                                   .where("p.id = :id",{id: projectId})
                                   .getRawOne();

        return project;                           
    }

}