import {MigrationInterface, QueryRunner} from "typeorm";

export class addPrefixcolToEmpTb1583838663666 implements MigrationInterface {
    name = 'addPrefixcolToEmpTb1583838663666'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" ADD "phonePrefix" character varying NOT NULL`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "phonePrefix"`, undefined);
    }

}
