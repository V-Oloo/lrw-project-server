import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, CreateDateColumn, JoinColumn, OneToOne } from "typeorm";

@Entity()
export class TaskTimeStamp extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({type : 'int'})
    task_id: number;

    @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    StartDateTime: Date;

    @Column({type: 'timestamptz',nullable: true})
    EndDateTime: Date;
}