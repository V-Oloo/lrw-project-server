import { TaskTimeStamp } from './../models/task_timestamp.entity';
import { getRepository, getConnection } from 'typeorm';
import { AssignedEmployees } from './../models/assigned_employess.entity';
import { TaskDTO } from './dto/tasks.dto';
import { Repository, EntityRepository, UpdateResult} from 'typeorm';
import { Task } from '../models/tasks.entity';
import { TaskStatus } from './task-status.enum';
import { GetTaskFilterDto } from './dto/get-tasks-filter.dto';
import { Project } from '../models/project.entity';
import { Employee } from '../models/employee.entity';
import {  NotFoundException } from '@nestjs/common';



@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {

    async getTasks(
        filterDto: GetTaskFilterDto,
        ): Promise<Task[]> {
        const {status, search} = filterDto;
        const query = this.createQueryBuilder('tasks');


        query.getMany();

        if (status) {
            query.andWhere('tasks.status = :status', {status});
        }

        if (search) {
            query.andWhere('(tasks.name LIKE :search OR tasks.description LIKE :search)', {search: `%${search}%`});
        }

        const tasks = await query.getMany();
        return tasks;

    }


    async createTask(createTaskDto: TaskDTO, project: Project): Promise<any> {
        const {name, description, expectedEndDate, expectedStartDate, assignedEmployees} = createTaskDto;

        const task = new Task();
        task.name = name;
        task.description = description;
        task.expectedStartDate = expectedStartDate;
        task.expectedEndDate = expectedEndDate;
        task.project = project;
        task.status = TaskStatus.OPEN;

 
        await task.save();

        const repo = getRepository(AssignedEmployees);
        const arr = [];
        for (let index = 0; index < assignedEmployees.length; index++) {
            const assign = new AssignedEmployees();
            assign.emp_id = +assignedEmployees[index];
            assign.task = task;
            arr.push(assign);
        }

        await repo.createQueryBuilder().insert().into(AssignedEmployees).values(arr).execute();

        return task;
}

    async updateTask( id: number, taskDTO: TaskDTO): Promise<UpdateResult> {
        const { name, description, expectedStartDate, expectedEndDate, assignedEmployees } = taskDTO;
        
        const result = this.createQueryBuilder()
                           .update(Task)
                           .set({name: name, description: description,
                                 expectedEndDate: expectedStartDate,
                                 expectedStartDate: expectedEndDate,
                                })
                           .where("id = :id", {id: id}).execute();

         return result;                  
    }

    async updateTaskStatus(id: number, status: TaskStatus): Promise<any> {
        const task = await this.findOne(id);

        if (!task) {
                 throw new NotFoundException(`Task not found`);
            }

        task.status = status;
        task.save();
        
        if(status == TaskStatus.IN_PROGRESS) {
            const res = await getConnection().createQueryBuilder()
            .insert().into(TaskTimeStamp)
            .values({task_id: id })
            .execute()
        }

        if(status == TaskStatus.COMPLETE) {
            const endDate = new Date()
            await  getConnection().createQueryBuilder()
                                    .update(TaskTimeStamp)
                                    .set({ EndDateTime : endDate })
                                    .where("task_id = :id", { id: id })
                                    .execute();
        }
       

        return task;                           
       
    }

    async getTask(id: number): Promise<Task> {
        const query = this.createQueryBuilder('task').
                           leftJoinAndSelect('task.project' , 'p')
                          .where("task.id = :id", { id: id })
                          .select(['task.*', 'p.name as project_name'])
                          .getRawOne();
        return query;                  
    }

    async getProjectTaskId(id: number) {
        const query = this.createQueryBuilder('task')
                          .innerJoinAndSelect('task.emp', 'a', 'task.id = a.task')
                          .innerJoinAndSelect(Employee, 'emp', 'a.emp_id = emp.id')
                          .select(['task.id', 'task.description','task.name', 'task.status','task.expectedStartDate','task.expectedEndDate'])
                          .addSelect('emp.id', 'empId')
                          .addSelect("CONCAT(emp.firstname, ' ', emp.lastname)", "name")
                          .where("task.id = :id", { id: id }) 
                          .groupBy("task.id")
                          .addGroupBy("emp.id")
                          .getRawMany();
             const part=(await query).slice(0,1);
             const employees=[];
             (await query).forEach(function(row)
             {    employees.push({
                   "empId":row.empId,
                   "name":row.name
                 });
             });
             const p1={task_id:part[0].task_id,
                task_name: part[0].task_name,
                task_description:part[0].task_description,
                task_expectedStartDate:part[0].task_expectedStartDate,
                task_expectedEndDate:part[0].task_expectedEndDate,
                task_status:part[0].task_status,
                employees:employees};
            return p1;              
             }

    async getEmployeeTasks(empId: number): Promise<any> {
        const query = this.createQueryBuilder('task')
                          .innerJoinAndSelect('task.emp','a')
                          .select(['task.id', 'task.description','task.name', 'task.status','task.expectedStartDate','task.expectedEndDate'])
                          .where("a.emp_id = :id", { id: empId })
                          .getRawMany();

        return query;                  
    }
}
