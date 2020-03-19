import {MigrationInterface, QueryRunner} from "typeorm";

export class addedPhonePrefCusDb1583993557388 implements MigrationInterface {
    name = 'addedPhonePrefCusDb1583993557388'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "customer" ADD "phonePrefix" character varying NOT NULL`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "customer" DROP COLUMN "phonePrefix"`, undefined);
    }

}
