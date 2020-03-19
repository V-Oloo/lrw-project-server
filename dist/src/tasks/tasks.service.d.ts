import { GetTaskFilterDto } from './dto/get-tasks-filter.dto';
import { TaskDTO } from './dto/tasks.dto';
import { TaskStatus } from './task-status.enum';
import { TaskRepository } from './tasks.repository';
import { Task } from '../models/tasks.entity';
import { Project } from '../models/project.entity';
import { UpdateResult } from 'typeorm';
export declare class TasksService {
    private taskRepository;
    constructor(taskRepository: TaskRepository);
    getTaskById(id: number): Promise<Task>;
    getTask(filterDto: GetTaskFilterDto): Promise<Task[]>;
    updateTask(id: number, taskDTO: TaskDTO): Promise<UpdateResult>;
    createTask(createTaskDto: TaskDTO, project: Project): Promise<Task>;
    deleteTask(id: number, project: Project): Promise<void>;
    updateTaskStatus(id: number, status: TaskStatus): Promise<Task>;
}
