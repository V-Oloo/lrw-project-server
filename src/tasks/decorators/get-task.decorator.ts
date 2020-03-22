import { createParamDecorator } from '@nestjs/common';
import { getRepository } from 'typeorm';
import { Task } from '../../models/tasks.entity';

export const GetTask = createParamDecorator(async (data, req): Promise<Task> => {

    const taskId = +req.params.id

    const taskRepository = getRepository(Task);
    const task = await taskRepository.findOne(taskId);
    
     return task;
});