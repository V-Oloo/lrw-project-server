import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany } from "typeorm";
import { Project } from "./project.entity";
import { Comment } from "./comment.entity";
import { AssignedEmployees } from "./assigned_employess.entity";

@Entity()
export class Task extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    plannedStartDate: string;

    @Column()
    plannedEndDate: string;

    @Column()
    status: string;

    @Column()
    street: string;

    @Column()
    state: string;

    @Column()
    city: string;

    @Column()
    zipCode: string;

    @Column({type: 'timestamptz',nullable: true})
    workStart: Date;

    @Column({type: 'timestamptz',nullable: true})
    workEnd: Date;

    @Column({type: 'int'})
    createdBy: number;

    @ManyToOne(() => Project,project => project.tasks)
    project: Project

    @OneToMany(() => AssignedEmployees, emp => emp.task)
    emp: AssignedEmployees[];  

    @OneToMany(() => Comment, comment => comment.task, {eager: false})
    comments: Comment[];

    @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    createDateTime: Date;

    @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    lastChangedDateTime: Date;
    
}