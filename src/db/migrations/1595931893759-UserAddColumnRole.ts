import {MigrationInterface, QueryRunner} from "typeorm";

export class UserAddColumnRole1595931893759 implements MigrationInterface {
    name = 'UserAddColumnRole1595931893759'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "role" character varying NOT NULL DEFAULT 'USER'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "role"`);
    }

}
