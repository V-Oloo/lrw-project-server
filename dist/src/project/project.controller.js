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
const common_1 = require("@nestjs/common");
const project_service_1 = require("./project.service");
const project_dto_1 = require("./dto/project.dto");
const get_customer_decorator_1 = require("./decorators/get-customer.decorator");
const customer_entity_1 = require("../models/customer.entity");
const passport_1 = require("@nestjs/passport");
let ProjectController = class ProjectController {
    constructor(boardService) {
        this.boardService = boardService;
    }
    addBoard(projectDTO, customer) {
        return this.boardService.addProject(projectDTO, customer);
    }
    getProjects() {
        return this.boardService.getProjects();
    }
    getProject(projectId) {
        return this.boardService.getProjectById(projectId);
    }
    async update(id, projectDTO) {
        return this.boardService.updateProject(id, projectDTO);
    }
    async delete(id) {
        return this.boardService.delete(id);
    }
};
__decorate([
    common_1.Post('/:id/addProject'),
    common_1.UsePipes(common_1.ValidationPipe),
    __param(0, common_1.Body()),
    __param(1, get_customer_decorator_1.GetCustomer()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [project_dto_1.ProjectDTO,
        customer_entity_1.Customer]),
    __metadata("design:returntype", Promise)
], ProjectController.prototype, "addBoard", null);
__decorate([
    common_1.Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProjectController.prototype, "getProjects", null);
__decorate([
    common_1.Get('/:id'),
    __param(0, common_1.Param('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ProjectController.prototype, "getProject", null);
__decorate([
    common_1.Put(':id/update'),
    __param(0, common_1.Param('id')), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, project_dto_1.ProjectDTO]),
    __metadata("design:returntype", Promise)
], ProjectController.prototype, "update", null);
__decorate([
    common_1.Delete(':id/delete'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ProjectController.prototype, "delete", null);
ProjectController = __decorate([
    common_1.Controller('project'),
    common_1.UseGuards(passport_1.AuthGuard()),
    __metadata("design:paramtypes", [project_service_1.ProjectService])
], ProjectController);
exports.ProjectController = ProjectController;
//# sourceMappingURL=project.controller.js.map