import { MigrationInterface, QueryRunner } from "typeorm";

export class Map1733995256502 implements MigrationInterface {
    name = 'Map1733995256502'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "client" RENAME COLUMN "adresse" TO "address"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "client" RENAME COLUMN "address" TO "adresse"`);
    }

}
