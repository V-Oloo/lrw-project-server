import { GetTaskFilterDto } from './dto/get-tasks-filter.dto';
import { TaskDTO } from './dto/tasks.dto';
import { TasksService } from './tasks.service';
import { TaskStatus } from './task-status.enum';
import { Project } from '../models/project.entity';
import { Task } from '../models/tasks.entity';
export declare class TasksController {
    private taskService;
    private logger;
    constructor(taskService: TasksService);
    getTasks(filterDto: GetTaskFilterDto): Promise<Task[]>;
    changePassword(taskId: number, taskDTO: TaskDTO): Promise<import("typeorm").UpdateResult>;
    getTaskById(id: number): Promise<Task>;
    createTask(createTaskDto: TaskDTO, project: Project): Promise<Task>;
    destroyTask(id: number, project: Project): Promise<void>;
    updateTaskStatus(id: number, status: TaskStatus): Promise<Task>;
}
