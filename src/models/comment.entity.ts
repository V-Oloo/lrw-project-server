import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, JoinColumn } from "typeorm";
import { Task } from "./tasks.entity";

@Entity()
export class Comment extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'text'})
    review: string;

    @Column()
    emp_id: number;

    @ManyToOne(() => Task, task => task.comments)
    @JoinColumn({name: 'task_id'})
    task: Task

    @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;
}