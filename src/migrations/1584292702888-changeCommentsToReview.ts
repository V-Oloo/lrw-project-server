import {MigrationInterface, QueryRunner} from "typeorm";

export class changeCommentsToReview1584292702888 implements MigrationInterface {
    name = 'changeCommentsToReview1584292702888'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comment" RENAME COLUMN "comment" TO "review"`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comment" RENAME COLUMN "review" TO "comment"`, undefined);
    }

}
