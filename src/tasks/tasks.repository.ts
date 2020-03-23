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
        const {name, description, plannedEndDate, plannedStartDate,street, state, city, zipCode, assignedEmployees} = createTaskDto;

        const task = new Task();
        task.name = name;
        task.description = description;
        task.plannedStartDate = plannedStartDate;
        task.plannedEndDate = plannedEndDate;
        task.project = project;
        task.street = street,
        task.state = state,
        task.city = city,
        task.zipCode = zipCode,
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
        const { name, description, plannedStartDate,street, state, city, zipCode, plannedEndDate, assignedEmployees } = taskDTO;
        
        const result = this.createQueryBuilder()
                           .update(Task)
                           .set({name: name, description: description,
                                plannedStartDate: plannedStartDate,
                                plannedEndDate: plannedEndDate,
                                street:street, state: state,
                                city: city, zipCode: zipCode
                                })
                           .where("id = :id", {id: id}).execute();

            const task = await this.findOne(id);

            await getConnection().createQueryBuilder()
                           .delete()
                           .from(AssignedEmployees)
                           .where("task_id = :task" ,{task: id})
                           .execute(); 
                           
            const repo = getRepository(AssignedEmployees);
            const arr = [];
            for (let index = 0; index < assignedEmployees.length; index++) {
                const assign = new AssignedEmployees();
                assign.emp_id = +assignedEmployees[index];
                assign.task = task;
                arr.push(assign);
            }
    
            await repo.createQueryBuilder().insert().into(AssignedEmployees).values(arr).execute();               

         return result;                  
    }

    async updateTaskStatus(id: number, status: TaskStatus): Promise<any> {
        const task = await this.findOne(id);

        if (!task) {
                 throw new NotFoundException(`Task not found`);
            }

        if(status == TaskStatus.IN_PROGRESS){
            let startDate = new Date()

            task.status = status;
            task.workStart = startDate;
            task.save();
        }

        if(status == TaskStatus.COMPLETE){
            let endDate = new Date()
            
            task.status = status;
            task.workEnd = endDate;
            task.save();
        }
       
        task.status = status;
        task.save();
       

        return task;                           
       
    }

    async getTask(id: number): Promise<Task> {
        const query = this.createQueryBuilder('task').
                           leftJoinAndSelect('task.project' , 'p')
                           .leftJoinAndSelect('p.customer','c')
                          .where("task.id = :id", { id: id })
                          .select(['task.*', 'p.name as project_name','c.organization as org','c.email as email'])
                          .getRawOne();
        return query;                  
    }

    async getProjectTaskId(id: number) {
        const query = this.createQueryBuilder('task')
                          .innerJoinAndSelect('task.emp', 'a', 'task.id = a.task')
                          .innerJoinAndSelect(Employee, 'emp', 'a.emp_id = emp.id')
                          .select(['task.id', 'task.description',
                          'task.name', 'task.status',
                          'task.plannedStartDate','task.plannedEndDate', 'task.street',
                          'task.city', 'task.state', 'task.zipCode'
                        ])
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
                task_plannedStartDate:part[0].task_plannedStartDate,
                task_plannedEndDate:part[0].task_plannedEndDate,
                task_status:part[0].task_status,
                task_street:part[0].task_street,
                task_state:part[0].task_state,
                task_city:part[0].task_city,
                task_zipCode:part[0].task_zipCode,
                employees:employees};
            return p1;              
             }
    async getCompletedTasksTimeStamp() {
        const query = this.createQueryBuilder('task')
                          .innerJoinAndSelect('task.emp', 'a', 'task.id = a.task')
                        //   .innerJoinAndSelect(TaskTimeStamp, 't', 'task.id = t.task_id')
                          .innerJoinAndSelect(Employee, 'emp', 'a.emp_id = emp.id')
                          .select('task.name')
                          .addSelect("CONCAT(emp.firstname, ' ', emp.lastname)", "name")
                          .addSelect('t.StartDateTime', 'starTime')
                          .addSelect('t.EndDateTime', 'endTime')
                          .groupBy("task.id")
                          .addGroupBy('t.StartDateTime')
                          .addGroupBy('t.EndDateTime')
                          .addGroupBy('emp.id')
                          .getRawMany();
                          
             return query;             

    }         

    async getEmployeeTasks(empId: number): Promise<any> {
        const query = this.createQueryBuilder('task')
                          .innerJoinAndSelect('task.emp','a')
                          .select(['task.id', 'task.description','task.name', 'task.status','task.plannedStartDate','task.plannedEndDate'])
                          .where("a.emp_id = :id", { id: empId })
                          .getRawMany();

        return query;                  
    }
}
