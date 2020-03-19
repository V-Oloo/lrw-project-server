import { Task } from 'src/models/tasks.entity';
import { CommentDTO } from './dto/create-comment.dto';
import { Comment } from './../models/comment.entity';
import { Injectable } from '@nestjs/common';
import { CommentsRepository } from './comments.repository';

@Injectable()
export class CommentsService {
    constructor(private commentRepository: CommentsRepository) {}

    async getComments(taskId: number): Promise<Comment[]> {
           return this.commentRepository.getComments(taskId);
    }

    async addComment(commentDto: CommentDTO, task: Task): Promise<Comment> {
        return this.commentRepository.addComment(commentDto, task);
    }
}
