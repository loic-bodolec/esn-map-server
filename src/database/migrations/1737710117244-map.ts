import { MigrationInterface, QueryRunner } from "typeorm";

export class Map1737710117244 implements MigrationInterface {
    name = 'Map1737710117244'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "techno" RENAME COLUMN "name" TO "technoName"`);
        await queryRunner.query(`ALTER TABLE "work" RENAME COLUMN "name" TO "workName"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "work" RENAME COLUMN "workName" TO "name"`);
        await queryRunner.query(`ALTER TABLE "techno" RENAME COLUMN "technoName" TO "name"`);
    }

}
