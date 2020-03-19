import {MigrationInterface, QueryRunner} from "typeorm";

export class StatusColCusTb1584602887112 implements MigrationInterface {
    name = 'StatusColCusTb1584602887112'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "customer" ADD "status" character varying NOT NULL DEFAULT 'ACTIVE'`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "customer" DROP COLUMN "status"`, undefined);
    }

}
