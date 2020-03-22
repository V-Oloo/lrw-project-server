import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, Unique, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm";
import { Project } from "./project.entity";

@Entity()
@Unique(['email'])
export class Customer extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    organization: string;

    @Column()
    contactPerson: string;

    @Column()
    phonePrefix: string

    @Column()
    phone: string;

    @Column()
    email: string;

    @Column()
    street: string;

    @Column()
    state: string;

    @Column()
    city: string;

    @Column()
    zipCode: string;

    @Column({default: 'ACTIVE'})
    status: string;

    @OneToMany(() => Project, project => project.customer)
    project: Project[];

    @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    createDateTime: Date;

    @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    lastChangedDateTime: Date;
    
    toResponseObject() {
        const {id, contactPerson, phone, email, state, city,zipCode,street, organization, phonePrefix} = this;
        return {id, contactPerson, phone, email, state, city,zipCode,street, organization, phonePrefix};
    }
}