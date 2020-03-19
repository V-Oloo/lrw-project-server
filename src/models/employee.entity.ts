import { BaseEntity, PrimaryGeneratedColumn, Column, Entity, Unique, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm";
import { File } from "./files.entity";
import * as bcrypt from 'bcrypt';
  

@Entity()
@Unique(['email'])
export class Employee extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstname: string;

    @Column()
    lastname: string;
    
    @Column()
    phonePrefix: string;

    @Column()
    phone: string;

    @Column()
    email: string;

    @Column()
    address: string;

    @Column()
    jobTitle: string;

    @Column({nullable: true})
    password: string;

    @Column({nullable: true})
    salt: string;

    @Column({nullable: true, default: 'ACTIVE'})
    status: string;

    @Column({default: "assets/images/avatars/avatar.png"})
    avatar: string;

    @Column({ type: 'varchar', length: 300 })
    createdBy: string;

    @OneToMany(() => File, files => files.emp,{ onUpdate: 'CASCADE', onDelete: 'CASCADE' })
    files: File[];  

    @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    createDateTime: Date;

    @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    lastChangedDateTime: Date;




    async validatePassword(password: string): Promise<boolean> {
        const hash = await bcrypt.hash(password, this.salt);
        return hash === this.password;
    }

    toResponseObject() {
        const {id, email,firstname, lastname, jobTitle, phone, address, status, phonePrefix, avatar} = this;
        return {id, email,firstname, lastname, jobTitle, phone, address, status, phonePrefix, avatar};
    }


}