import {MigrationInterface, QueryRunner} from "typeorm";

export class realtionUserPermission1613236735817 implements MigrationInterface {
    name = 'realtionUserPermission1613236735817'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_a3ffb1c0c8416b9fc6f907b7433"`);
        await queryRunner.query(`CREATE TABLE "permissions" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "userId" uuid, CONSTRAINT "PK_920331560282b8bd21bb02290df" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "permissions" ADD CONSTRAINT "FK_eab26c6cc4b9cc604099bc32dff" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "permissions" DROP CONSTRAINT "FK_eab26c6cc4b9cc604099bc32dff"`);
        await queryRunner.query(`DROP TABLE "permissions"`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_a3ffb1c0c8416b9fc6f907b7433" FOREIGN KEY ("id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
