import { Task } from '../models/tasks.entity';
import { CommentsService } from './comments.service';
import { Controller, Get, Post, ValidationPipe, UsePipes, Body, ParseIntPipe, Param } from '@nestjs/common';
import { CommentDTO } from './dto/create-comment.dto';
import { GetTask } from './decorators/get-task.decorator';

@Controller('comments')
export class CommentsController {

    constructor(private commentService: CommentsService) {}
    
    @Post('/:id/addComment')
    @UsePipes(ValidationPipe)
    addComment(@Body() body: CommentDTO, @GetTask() task: Task ): Promise<any> {
      return this.commentService.addComment(body, task);
    }

    @Get('/task/:id')
    getTaskComments(@Param('id', ParseIntPipe) taskId: number) {
      return this.commentService.getComments(taskId);
    }

}
