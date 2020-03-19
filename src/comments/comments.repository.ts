import { Employee } from '../models/employee.entity';
import { Task } from 'src/models/tasks.entity';
import { Comment } from './../models/comment.entity';
import { Repository, EntityRepository, getRepository } from "typeorm";
import { CommentDTO } from './dto/create-comment.dto';

@EntityRepository(Comment)
export class CommentsRepository extends Repository<Comment> {

    async getComments(id: number): Promise<any> {
        const query = this.createQueryBuilder('comment')
                          .innerJoinAndSelect(Employee, 'emp', 'comment.emp_id = emp.id')
                          .select('comment.*')
                          .addSelect("CONCAT(emp.firstname, ' ', emp.lastname)", "name")
                          .where("comment.task = :id", {id: id})
                          .getRawMany()

        return query;                  

        
    }

    async addComment(commentDTO: CommentDTO, task: Task): Promise<any> {

        const {emp_id, comment} = commentDTO;

        const res = new Comment();

        res.emp_id = emp_id;
        res.review = comment;
        res.task = task;

        res.save();

        return res;

       
    }


}