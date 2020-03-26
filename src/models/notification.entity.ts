import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm";

@Entity()
export class Notification extends BaseEntity {

@PrimaryGeneratedColumn()
id: number;

@Column({type: "varchar"})
event: string;

@Column({type: "text"})
message: string;

@Column()
status: string;

@Column()
user: number;

@CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
createdAt: Date;
}