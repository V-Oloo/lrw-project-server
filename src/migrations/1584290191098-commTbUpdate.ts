import {MigrationInterface, QueryRunner} from "typeorm";

export class commTbUpdate1584290191098 implements MigrationInterface {
    name = 'commTbUpdate1584290191098'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comments" DROP COLUMN "userId"`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comments" ADD "userId" bigint NOT NULL`, undefined);
    }

}
