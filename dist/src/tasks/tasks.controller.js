"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = require("@nestjs/passport");
const get_tasks_filter_dto_1 = require("./dto/get-tasks-filter.dto");
const tasks_dto_1 = require("./dto/tasks.dto");
const tasks_service_1 = require("./tasks.service");
const common_1 = require("@nestjs/common");
const task_status_validation_1 = require("./pipes/task-status-validation");
const task_status_enum_1 = require("./task-status.enum");
const get_project_decorator_1 = require("./decorators/get-project.decorator");
const project_entity_1 = require("../models/project.entity");
let TasksController = class TasksController {
    constructor(taskService) {
        this.taskService = taskService;
        this.logger = new common_1.Logger('TasksController');
    }
    getTasks(filterDto) {
        return this.taskService.getTask(filterDto);
    }
    changePassword(taskId, taskDTO) {
        return this.taskService.updateTask(taskId, taskDTO);
    }
    getTaskById(id) {
        return this.taskService.getTaskById(id);
    }
    createTask(createTaskDto, project) {
        this.logger.verbose(`"${project.name}" creating a task. Data: ${JSON.stringify(createTaskDto)}`);
        return this.taskService.createTask(createTaskDto, project);
    }
    destroyTask(id, project) {
        return this.taskService.deleteTask(id, project);
    }
    updateTaskStatus(id, status) {
        return this.taskService.updateTaskStatus(id, status);
    }
};
__decorate([
    common_1.Get(),
    __param(0, common_1.Query(common_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [get_tasks_filter_dto_1.GetTaskFilterDto]),
    __metadata("design:returntype", Promise)
], TasksController.prototype, "getTasks", null);
__decorate([
    common_1.Patch('/:taskId/update'),
    __param(0, common_1.Param('taskId', common_1.ParseIntPipe)), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, tasks_dto_1.TaskDTO]),
    __metadata("design:returntype", void 0)
], TasksController.prototype, "changePassword", null);
__decorate([
    common_1.Get('/:id'),
    __param(0, common_1.Param('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], TasksController.prototype, "getTaskById", null);
__decorate([
    common_1.Post('/:id/addTask'),
    common_1.UsePipes(common_1.ValidationPipe),
    __param(0, common_1.Body()),
    __param(1, get_project_decorator_1.GetProject()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [tasks_dto_1.TaskDTO,
        project_entity_1.Project]),
    __metadata("design:returntype", Promise)
], TasksController.prototype, "createTask", null);
__decorate([
    common_1.Delete('/:id'),
    __param(0, common_1.Param('id', common_1.ParseIntPipe)), __param(1, get_project_decorator_1.GetProject()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, project_entity_1.Project]),
    __metadata("design:returntype", Promise)
], TasksController.prototype, "destroyTask", null);
__decorate([
    common_1.Patch('/:id/status'),
    __param(0, common_1.Param('id', common_1.ParseIntPipe)), __param(1, common_1.Body('status', task_status_validation_1.TaskStatusValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String]),
    __metadata("design:returntype", Promise)
], TasksController.prototype, "updateTaskStatus", null);
TasksController = __decorate([
    common_1.Controller('tasks'),
    common_1.UseGuards(passport_1.AuthGuard()),
    __metadata("design:paramtypes", [tasks_service_1.TasksService])
], TasksController);
exports.TasksController = TasksController;
//# sourceMappingURL=tasks.controller.js.map