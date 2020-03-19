import { GetTaskFilterDto } from './dto/get-tasks-filter.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskDTO } from './dto/tasks.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskStatus } from './task-status.enum';
import { TaskRepository } from './tasks.repository';
import { Task } from '../models/tasks.entity';
import { Project } from '../models/project.entity';
import { UpdateResult } from 'typeorm';

@Injectable()
export class TasksService {

    constructor(
        @InjectRepository(TaskRepository)
        private taskRepository: TaskRepository,
        ) {}

    async getTaskById(id: number): Promise<Task> {
        const found = await this.taskRepository.getTask(id);
        if (!found) {
             throw new NotFoundException(`Task not found`);
        }
        return found;
    }

    async getTask(
        filterDto: GetTaskFilterDto,
        ): Promise<Task[]> {

        return await this.taskRepository.getTasks(filterDto);

    }

    async updateTask(id: number, taskDTO: TaskDTO): Promise<UpdateResult> {
        return await this.taskRepository.updateTask(id, taskDTO);
    }

  
    async createTask(createTaskDto: TaskDTO, project: Project): Promise<Task> {
       return this.taskRepository.createTask(createTaskDto, project);
    }

    async deleteTask(id: number, project: Project): Promise<void> {
        const result = await this.taskRepository.delete({ id, project });
        if (result.affected === 0) {
            throw new NotFoundException(`Task with ID "${id}" not found`);
        }

   }

    async updateTaskStatus(id: number, status: TaskStatus): Promise<Task> {
      
       return this.taskRepository.updateTaskStatus(id, status);
    }

    async getProjectTaskId(id: number): Promise<any> {
        return await this.taskRepository.getProjectTaskId(id);
    }

    async getEmployeeTasks(empId: number): Promise<any> {
        return await this.taskRepository.getEmployeeTasks(empId);
    }
}
