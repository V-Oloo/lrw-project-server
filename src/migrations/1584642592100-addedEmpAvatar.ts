import {MigrationInterface, QueryRunner} from "typeorm";

export class addedEmpAvatar1584642592100 implements MigrationInterface {
    name = 'addedEmpAvatar1584642592100'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" ADD "avatar" character varying NOT NULL DEFAULT 'assets/images/avatars/avatar.png.png'`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "avatar"`, undefined);
    }

}
