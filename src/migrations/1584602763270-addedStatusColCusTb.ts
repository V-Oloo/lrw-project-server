import {MigrationInterface, QueryRunner} from "typeorm";

export class addedStatusColCusTb1584602763270 implements MigrationInterface {
    name = 'addedStatusColCusTb1584602763270'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" ALTER COLUMN "status" SET DEFAULT 'ACTIVE'`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" ALTER COLUMN "status" SET DEFAULT 'INACTIVE'`, undefined);
    }

}
