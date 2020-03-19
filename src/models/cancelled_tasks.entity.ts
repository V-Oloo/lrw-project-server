import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, CreateDateColumn, JoinColumn, OneToOne } from "typeorm";

@Entity()
export class CancelledTasks extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({type : 'int'})
    task_id: number;

    @Column({type: 'text'})
    reason: string;

    @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;
   
}