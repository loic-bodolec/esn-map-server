import { MigrationInterface, QueryRunner } from "typeorm";

export class Map1738243852204 implements MigrationInterface {
    name = 'Map1738243852204'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "expertise" RENAME COLUMN "name" TO "expertiseName"`);
        await queryRunner.query(`ALTER TABLE "job" RENAME COLUMN "name" TO "JobName"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "job" RENAME COLUMN "JobName" TO "name"`);
        await queryRunner.query(`ALTER TABLE "expertise" RENAME COLUMN "expertiseName" TO "name"`);
    }

}
