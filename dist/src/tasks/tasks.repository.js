"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const tasks_entity_1 = require("../models/tasks.entity");
const task_status_enum_1 = require("./task-status.enum");
let TaskRepository = class TaskRepository extends typeorm_1.Repository {
    async getTasks(filterDto) {
        const { status, search } = filterDto;
        const query = this.createQueryBuilder('tasks');
        query.getMany();
        if (status) {
            query.andWhere('tasks.status = :status', { status });
        }
        if (search) {
            query.andWhere('(tasks.name LIKE :search OR tasks.description LIKE :search)', { search: `%${search}%` });
        }
        const tasks = await query.getMany();
        return tasks;
    }
    async createTask(createTaskDto, project) {
        const { name, description, expectedEndDate, expectedStartDate, assignedEmployees } = createTaskDto;
        const task = new tasks_entity_1.Task();
        task.name = name;
        task.description = description;
        task.expectedStartDate = expectedStartDate;
        task.expectedEndDate = expectedEndDate;
        task.assignedEmployees = assignedEmployees;
        task.project = project;
        task.status = task_status_enum_1.TaskStatus.OPEN;
        await task.save();
        return task;
    }
    async updateTask(id, taskDTO) {
        const { name, description, expectedStartDate, expectedEndDate, assignedEmployees } = taskDTO;
        const result = this.createQueryBuilder()
            .update(tasks_entity_1.Task)
            .set({ name: name, description: description,
            expectedEndDate: expectedStartDate,
            expectedStartDate: expectedEndDate,
            assignedEmployees: assignedEmployees })
            .where("id = :id", { id: id }).execute();
        return result;
    }
    async getTask(id) {
        const query = this.createQueryBuilder('task').
            leftJoinAndSelect('task.project', 'p')
            .where("task.id = :id", { id: id })
            .select(['task.*', 'p.name as project_name'])
            .getRawOne();
        return query;
    }
};
TaskRepository = __decorate([
    typeorm_1.EntityRepository(tasks_entity_1.Task)
], TaskRepository);
exports.TaskRepository = TaskRepository;
//# sourceMappingURL=tasks.repository.js.map