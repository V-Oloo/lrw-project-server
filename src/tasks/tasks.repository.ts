import { Notification } from './../models/notification.entity';
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

        const tasks = await query.getMany();
        return tasks;

    }


    async createTask(createTaskDto: TaskDTO, project: Project): Promise<any> {
        const {plannedEndDate, plannedStartDate,street, state, city, zipCode, flaggers, createdBy} = createTaskDto;

        const task = new Task();
        task.plannedStartDate = plannedStartDate;
        task.plannedEndDate = plannedEndDate;
        task.project = project;
        task.street = street,
        task.state = state,
        task.city = city,
        task.zipCode = zipCode,
        task.createdBy = createdBy
        task.status = TaskStatus.OPEN;

 
        await task.save();

        const repo = getRepository(AssignedEmployees);
        const arr = [];
        for (let index = 0; index < flaggers.length; index++) {
            const assign = new AssignedEmployees();
            assign.emp_id = +flaggers[index];
            assign.task = task;
            arr.push(assign);
        }
        await repo.createQueryBuilder().insert().into(AssignedEmployees).values(arr).execute();

        const notification = getRepository(Notification);
        const arrNotification = [];
        for (let index = 0; index < flaggers.length; index++) {
            const insert = new Notification();
            insert.user = +flaggers[index];
            insert.event = "Task Assignment";
            insert.message = "You have been assigned a new task"
            insert.status = "UNREAD" 
            arrNotification.push(insert);
        }
        await notification.createQueryBuilder().insert().into(Notification).values(arrNotification).execute();
        return task;
}

    async updateTask( id: number, taskDTO: TaskDTO): Promise<UpdateResult> {
        const {plannedStartDate,street, state, city, zipCode, plannedEndDate, flaggers } = taskDTO;
        
        const result = this.createQueryBuilder()
                           .update(Task)
                           .set({
                                plannedStartDate: plannedStartDate,
                                plannedEndDate: plannedEndDate,
                                street:street, state: state,
                                city: city, zipCode: zipCode
                                })
                           .where("id = :id", {id: id}).execute();

            const task = await this.findOne(id);

            let strt = task.street;
            let cty = task.city;
            let ste = task.state;
            let zp = task.zipCode;
    
            const address = strt + ',' + cty + ',' + ste + ',' + zp;

            await getConnection().createQueryBuilder()
                           .delete()
                           .from(AssignedEmployees)
                           .where("task_id = :task" ,{task: id})
                           .execute(); 
                           
            const repo = getRepository(AssignedEmployees);
            const arr = [];
            for (let index = 0; index < flaggers.length; index++) {
                const assign = new AssignedEmployees();
                assign.emp_id = +flaggers[index];
                assign.task = task;
                arr.push(assign);
            }
    
            await repo.createQueryBuilder().insert().into(AssignedEmployees).values(arr).execute(); 
            
            const notification = getRepository(Notification);
            const arrNotification = [];
            for (let index = 0; index < flaggers.length; index++) {
                const insert = new Notification();
                insert.user = +flaggers[index];
                insert.event = "Task Update";
                insert.message = 
                "Your assigned Task: " + address + "has been updated, Please check for more details";
                insert.status = "UNREAD" 
                arrNotification.push(insert);
            }
            await notification.createQueryBuilder().insert().into(Notification).values(arrNotification).execute();

         return result;                  
    }

    async updateTaskStatus(id: number, status: TaskStatus): Promise<any> {
        const task = await this.findOne(id);

        if (!task) {
                 throw new NotFoundException(`Task not found`);
            }
        let street = task.street;
        let city = task.city;
        let state = task.state;
        let zip = task.zipCode;

        const address = street + ',' + city + ',' + state + ',' + zip;

        if(status == TaskStatus.IN_PROGRESS){
            let startDate = new Date()

            task.status = status;
            task.workStart = startDate;
            await task.save();
        }

        if(status == TaskStatus.COMPLETE){
            let endDate = new Date()
            
            task.status = status;
            task.workEnd = endDate;
            await task.save();

            const notification = getRepository(Notification);
            const insert = new Notification();
            insert.user = task.createdBy;
            insert.status = "UNREAD";
            insert.event = "Task Completed"
            insert.message = "The Task: " + address + "has been completed,";
            await insert.save();
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
                          .select(['task.id',
                          'task.status',
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
                          .innerJoinAndSelect(Employee, 'emp', 'a.emp_id = emp.id')
                          .innerJoinAndSelect('task.project','p','p.id=task.project')
                          .innerJoinAndSelect('p.customer','c','c.id=p.customer')
                          .select("CONCAT(emp.firstname, ' ', emp.lastname)", "name")
                          .addSelect('task.workStart', 'starTime')
                          .addSelect('task.workEnd', 'endTime')
                          .addSelect('c.organization', 'customer')
                          .addSelect('p.name','project')
                          .where('task.status = :status',{status: 'COMPLETE'})
                          .groupBy("task.id")
                          .addGroupBy('emp.id')
                          .addGroupBy('p.id')
                          .addGroupBy('c.id')
                          .orderBy('task.workStart', 'DESC')
                          .getRawMany();
                          
             return query;             

    }         

    async getEmployeeTasks(empId: number): Promise<any> {
        const query = this.createQueryBuilder('task')
                          .innerJoinAndSelect('task.emp','a')
                          .select(['task.id','task.status','task.plannedStartDate','task.plannedEndDate'])
                          .where("a.emp_id = :id", { id: empId })
                          .getRawMany();

        return query;                  
    }

}
