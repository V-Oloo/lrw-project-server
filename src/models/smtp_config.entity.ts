import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from "typeorm";

@Entity()
export class SmtpConfig extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'varchar'})
    host: string;

    @Column({type: 'varchar'})
    port: string

    @Column({type: 'varchar'})
    username: string

    @Column({type: 'varchar'})
    password: string

   
}