import {MigrationInterface, QueryRunner} from "typeorm";

export class DbSetup1595892850547 implements MigrationInterface {
    name = 'DbSetup1595892850547'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "adminUser" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "username" character varying(50) NOT NULL, "password" character varying(128) NOT NULL, CONSTRAINT "UQ_58bd2b086488ba1ba90847a192e" UNIQUE ("username"), CONSTRAINT "PK_f155e50a944f2658dc1ccb477a2" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "adminUser"`);
    }

}
