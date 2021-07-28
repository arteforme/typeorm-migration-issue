import { MigrationInterface, QueryRunner } from "typeorm";

import { Company } from "./../entity/Company";
import { User } from "../entity/User";

export class schemaCreation1627513975044 implements MigrationInterface {
  name = "schemaCreation1627513975044";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "company" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_056f7854a7afdba7cbd6d45fc20" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "user" ("id" SERIAL NOT NULL, "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "age" integer NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`
    );

    const user = new User();
    user.age = 1;
    user.firstName = "first";
    user.lastName = "user";

    await queryRunner.manager.save(user);

    const company = new Company();
    company.name = "company";

    await queryRunner.manager.save(company);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "user"`);
    await queryRunner.query(`DROP TABLE "company"`);
  }
}
