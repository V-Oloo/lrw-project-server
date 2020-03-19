import {MigrationInterface, QueryRunner} from "typeorm";

export class removedDeptEmpTb1584200466502 implements MigrationInterface {
    name = 'removedDeptEmpTb1584200466502'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "department"`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" ADD "department" character varying NOT NULL`, undefined);
    }

}
