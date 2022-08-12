import {MigrationInterface, QueryRunner} from "typeorm";

export class createTables1660345870905 implements MigrationInterface {
    name = 'createTables1660345870905'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "address" ("id" SERIAL NOT NULL, "street" character varying NOT NULL, "city" character varying NOT NULL, "state" character varying NOT NULL, "country" character varying NOT NULL, "default" boolean NOT NULL DEFAULT false, "type" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updated_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "passengerId" integer, CONSTRAINT "PK_d92de1f82754668b5f5f5dd4fd5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "device" ("id" SERIAL NOT NULL, "ip" character varying NOT NULL, "browser" character varying NOT NULL, "referrer" character varying, "is_active" boolean NOT NULL DEFAULT false, "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updated_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "passengerId" integer, CONSTRAINT "PK_2dc10972aa4e27c01378dad2c72" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "passenger" ("id" SERIAL NOT NULL, "hash" character varying NOT NULL, "email" character varying NOT NULL, "first_name" character varying NOT NULL, "last_name" character varying NOT NULL, "password" character varying NOT NULL, "phone_number" character varying NOT NULL, "is_active" boolean NOT NULL DEFAULT true, "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updated_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, CONSTRAINT "UQ_f12da964eb55c8ab8f10fc51812" UNIQUE ("email"), CONSTRAINT "PK_50e940dd2c126adc20205e83fac" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "card" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updated_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "passengerId" integer, CONSTRAINT "PK_9451069b6f1199730791a7f4ae4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "address" ADD CONSTRAINT "FK_6c1b49c7b93f3dc0c440cc3dc6b" FOREIGN KEY ("passengerId") REFERENCES "passenger"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "device" ADD CONSTRAINT "FK_f19cbcc66d17e1228e1c9f3ebdb" FOREIGN KEY ("passengerId") REFERENCES "passenger"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "card" ADD CONSTRAINT "FK_1bb30c63165f667b0217e9c0dcc" FOREIGN KEY ("passengerId") REFERENCES "passenger"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "card" DROP CONSTRAINT "FK_1bb30c63165f667b0217e9c0dcc"`);
        await queryRunner.query(`ALTER TABLE "device" DROP CONSTRAINT "FK_f19cbcc66d17e1228e1c9f3ebdb"`);
        await queryRunner.query(`ALTER TABLE "address" DROP CONSTRAINT "FK_6c1b49c7b93f3dc0c440cc3dc6b"`);
        await queryRunner.query(`DROP TABLE "card"`);
        await queryRunner.query(`DROP TABLE "passenger"`);
        await queryRunner.query(`DROP TABLE "device"`);
        await queryRunner.query(`DROP TABLE "address"`);
    }

}
