import {MigrationInterface, QueryRunner} from "typeorm";

export class commentsTbUpdate1584285694714 implements MigrationInterface {
    name = 'commentsTbUpdate1584285694714'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comments" DROP COLUMN "user"`, undefined);
        await queryRunner.query(`ALTER TABLE "comments" ADD "user" integer NOT NULL`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comments" DROP COLUMN "user"`, undefined);
        await queryRunner.query(`ALTER TABLE "comments" ADD "user" character varying NOT NULL`, undefined);
    }

}
