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
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const project_repository_1 = require("./project.repository");
let ProjectService = class ProjectService {
    constructor(projectRepository) {
        this.projectRepository = projectRepository;
    }
    async getProjects() {
        return this.projectRepository.getProjects();
    }
    async getProjectById(boardId) {
        const project = await this.projectRepository.findOne(boardId);
        if (!project) {
            throw new common_1.HttpException('Board not found', common_1.HttpStatus.NOT_FOUND);
        }
        const projectData = {
            name: project.name,
            description: project.description,
        };
        return projectData;
    }
    async addProject(projectDTO, customer) {
        return this.projectRepository.addProject(projectDTO, customer);
    }
    async updateProject(id, projectDTO) {
        return await this.projectRepository.updateProject(id, projectDTO);
    }
    async delete(id) {
        const result = await this.projectRepository.delete(id);
        if (result.affected === 0) {
            throw new common_1.HttpException('Board not found', common_1.HttpStatus.NOT_FOUND);
        }
        return result;
    }
};
ProjectService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [project_repository_1.ProjectRepository])
], ProjectService);
exports.ProjectService = ProjectService;
//# sourceMappingURL=project.service.js.map