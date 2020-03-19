"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const project_entity_1 = require("../../models/project.entity");
const typeorm_1 = require("typeorm");
exports.GetProject = common_1.createParamDecorator(async (data, req) => {
    const projectId = +req.params.id;
    const projectRepository = typeorm_1.getRepository(project_entity_1.Project);
    const project = await projectRepository.findOne(projectId);
    return project;
});
//# sourceMappingURL=get-project.decorator.js.map