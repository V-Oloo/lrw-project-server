import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany } from "typeorm";
// import { TaskStatus } from "./task-status.enum";
import { Project } from "./project.entity";
import { Comment } from "./comment.entity";
import { AssignedEmployees } from "./assigned_employess.entity";

@Entity()
export class Task extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: "text"})
    name: string;

    @Column({type: "text"})
    description: string;

    @Column()
    expectedStartDate: string;

    @Column()
    expectedEndDate: string;

    @Column()
    status: string;

    @ManyToOne(() => Project,project => project.tasks)
    project: Project

    @OneToMany(() => AssignedEmployees, emp => emp.task,{ onUpdate: 'CASCADE', onDelete: 'CASCADE' })
    emp: AssignedEmployees[];  

    @OneToMany(() => Comment, comment => comment.task, {eager: false})
    comments: Comment[];

    @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    createDateTime: Date;

    @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    lastChangedDateTime: Date;
    
}