import {MigrationInterface, QueryRunner} from "typeorm";

export class removedassiEmpTaskTb1584221245344 implements MigrationInterface {
    name = 'removedassiEmpTaskTb1584221245344'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task" DROP COLUMN "assignedEmployees"`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task" ADD "assignedEmployees" text NOT NULL`, undefined);
    }

}
