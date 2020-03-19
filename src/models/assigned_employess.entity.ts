import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Task } from "./tasks.entity";

@Entity()
export class AssignedEmployees extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    emp_id: number;

    @ManyToOne(() => Task, task => task.emp,{ onUpdate: 'CASCADE', onDelete: 'CASCADE' })
    @JoinColumn({ name: 'task_id' })
    task: Task;
}