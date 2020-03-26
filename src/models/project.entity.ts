import { BaseEntity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, ManyToOne, Entity } from "typeorm";
import { Task } from "./tasks.entity";
import { Customer } from "./customer.entity";

@Entity()
export class Project extends BaseEntity {

    @PrimaryGeneratedColumn()
    id : number

    @Column()
    name: string

    @Column({type: 'text'})
    description: string

    @Column({type: 'date'})
    startDate: string

    @Column({type: 'date'})
    endDate: string

    @Column()
    status: string

    @Column({type : 'float'})
    cone_rate: number;

    @Column({type : 'float'})
    flagger_rate: number;

    @Column({type : 'float'})
    sign_rate: number;

    @Column()
    boards_rate: number;

    @Column()
    min_hours: string;

    @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    createAt: Date;

    @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    lastUpdatedAt: Date;

    @OneToMany(() => Task, task => task.project, {eager: true})
    tasks: Project[];

    @ManyToOne(() => Customer,customer => customer.project)
    customer: Customer

}