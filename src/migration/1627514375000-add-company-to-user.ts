import { MigrationInterface, QueryRunner } from "typeorm";

import { Company } from "./../entity/Company";
import { User } from "../entity/User";

export class addCompanyToUser1627514375000 implements MigrationInterface {
  name = "addCompanyToUser1627514375000";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" ADD "company_id" integer`);
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "FK_9e70b5f9d7095018e86970c7874" FOREIGN KEY ("company_id") REFERENCES "company"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );

    const targetCompany = await queryRunner.manager
      .createQueryBuilder(Company, "c")
      .where("c.name = :name", { name: "company" })
      .getOne();

    await queryRunner.manager
      .createQueryBuilder(User, "u")
      .update({
        companyId: targetCompany.id,
      })
      .execute();

    await queryRunner.query(
      'ALTER TABLE "user" ALTER COLUMN "company_id" SET NOT NULL'
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "FK_9e70b5f9d7095018e86970c7874"`
    );
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "company_id"`);
  }
}
