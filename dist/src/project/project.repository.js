"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const project_entity_1 = require("../models/project.entity");
let ProjectRepository = class ProjectRepository extends typeorm_1.Repository {
    async getProjects() {
        const query = this.createQueryBuilder('project');
        const projects = await query.getMany();
        return projects;
    }
    async addProject(projectDTO, customer) {
        const { name, description, startDate, endDate } = projectDTO;
        const project = new project_entity_1.Project();
        project.name = name;
        project.description = description;
        project.startDate = startDate;
        project.endDate = endDate;
        project.status = "OPEN";
        project.customer = customer;
        await project.save();
    }
    async updateProject(id, projectDTO) {
        return await this.update(id, projectDTO);
    }
    async delete(id) {
        const query = this.createQueryBuilder()
            .delete().from(project_entity_1.Project)
            .where("id = :id", { id: id })
            .execute();
        return query;
    }
};
ProjectRepository = __decorate([
    typeorm_1.EntityRepository(project_entity_1.Project)
], ProjectRepository);
exports.ProjectRepository = ProjectRepository;
//# sourceMappingURL=project.repository.js.map