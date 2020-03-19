import { AuthGuard } from '@nestjs/passport';
import { GetTaskFilterDto } from './dto/get-tasks-filter.dto';
import { TaskDTO } from './dto/tasks.dto';
import { TasksService } from './tasks.service';
import { Controller, Get, Post, Body, Param, Delete, Patch, Query, UsePipes, ValidationPipe, ParseIntPipe, UseGuards, Logger } from '@nestjs/common';
import { TaskStatusValidationPipe } from './pipes/task-status-validation';
import { TaskStatus } from './task-status.enum';
import { GetProject } from './decorators/get-project.decorator';
import { Project } from '../models/project.entity';
import { Task } from '../models/tasks.entity';

@Controller('tasks')
// @UseGuards(AuthGuard())
export class TasksController {
    private logger = new Logger('TasksController');
    constructor(private taskService: TasksService) {}

    @Get()
    getTasks(
      @Query(ValidationPipe) filterDto: GetTaskFilterDto,
    ): Promise<Task[]> {
      return this.taskService.getTask(filterDto);
    }

    @Patch('/:taskId/update')
    changePassword(@Param('taskId',  ParseIntPipe) taskId: number, @Body() taskDTO: TaskDTO) {
        return this.taskService.updateTask(taskId, taskDTO);
    }

    @Get('/:id')
    getTaskById(@Param('id', ParseIntPipe) id: number): Promise<Task> {
      return this.taskService.getTaskById(id);
    }

    @Post('/:id/addTask')
    @UsePipes(ValidationPipe)
    createTask(
      @Body() createTaskDto: TaskDTO,
      @GetProject() project: Project,
      ): Promise<Task> {
        return this.taskService.createTask(createTaskDto, project);
    }

    @Delete('/:id')
    destroyTask(@Param('id', ParseIntPipe) id: number, @GetProject() project: Project): Promise<void> {
        return this.taskService.deleteTask(id, project);
    }

    @Patch('/:id/status')
    updateTaskStatus( @Param('id', ParseIntPipe) id: number, @Body('status', TaskStatusValidationPipe) status: TaskStatus): Promise<Task> {
       console.log(status);
      return this.taskService.updateTaskStatus(id, status);
    }

    @Get('/project/task/:id')
    getProjectTaskId(@Param('id', ParseIntPipe) id: number): Promise<any> {
      return this.taskService.getProjectTaskId(id);
    }

    @Get('/employee/:id/tasks')
    getEmployeeTasks(@Param('id', ParseIntPipe) id: number): Promise<any> {
      return this.taskService.getEmployeeTasks(id);
    }

}
