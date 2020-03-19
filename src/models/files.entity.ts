import { BaseEntity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, ManyToOne, Entity, JoinColumn } from "typeorm";
import { IsOptional, IsString, IsEmpty, IsNumber } from "class-validator";
import { Employee } from "./employee.entity";

@Entity()
export class File extends BaseEntity {

  @PrimaryGeneratedColumn()
  @IsOptional({ always: true })
  id: number;

  @Column({ length: 50 })
  @IsString({ always: true })
  @IsEmpty({ always: true, message: 'hey...' })
  original_name: string;

  @Column({ length: 50 })
  @IsString({ always: true })
  @IsEmpty({ always: true, message: 'hey...' })
  current_name: string;

  @Column({ length: 50 })
  @IsString({ always: true })
  @IsEmpty({ always: true, message: 'hey...' })
  extention: string;

  @Column({ type: 'int' })
  @IsNumber()
  @IsEmpty({ always: true, message: 'hey...' })
  size: number;

  @ManyToOne(() => Employee, employee => employee.files,{ onUpdate: 'CASCADE', onDelete: 'CASCADE' })
  @JoinColumn({ name: 'emp_id' })
  emp: Employee;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  lastUpdatedAt: Date;

}