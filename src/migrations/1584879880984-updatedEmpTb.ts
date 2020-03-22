import {MigrationInterface, QueryRunner} from "typeorm";

export class updatedEmpTb1584879880984 implements MigrationInterface {
    name = 'updatedEmpTb1584879880984'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" ALTER COLUMN "avatar" SET DEFAULT 'assets/images/avatars/avatar.png'`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" ALTER COLUMN "avatar" DROP DEFAULT`, undefined);
    }

}
