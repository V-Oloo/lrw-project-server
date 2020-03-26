import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from "typeorm";


@Entity()
export class Company extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    organization: string;

    @Column()
    contact_person: string;

    @Column()
    phone: string;

    @Column()
    email: string;

    @Column()
    address: string;

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
}