import { TaskDTO } from './dto/tasks.dto';
import { Repository, UpdateResult } from 'typeorm';
import { Task } from '../models/tasks.entity';
import { GetTaskFilterDto } from './dto/get-tasks-filter.dto';
import { Project } from '../models/project.entity';
export declare class TaskRepository extends Repository<Task> {
    getTasks(filterDto: GetTaskFilterDto): Promise<Task[]>;
    createTask(createTaskDto: TaskDTO, project: Project): Promise<Task>;
    updateTask(id: number, taskDTO: TaskDTO): Promise<UpdateResult>;
    getTask(id: number): Promise<Task>;
}
