import { createParamDecorator } from '@nestjs/common';
import { Project } from '../../models/project.entity';
import { getRepository } from 'typeorm';

export const GetProject = createParamDecorator(async (data, req): Promise<Project> => {

    const projectId = +req.params.id

    const projectRepository = getRepository(Project);
    const project = await projectRepository.findOne(projectId);
    
     return project;
});