import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

import { Company } from "./Company";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  age: number;

  @ManyToOne(() => Company, (company) => company.users)
  @JoinColumn({ name: "company_id" })
  company: Company;

  @Column({
    name: "company_id",
  })
  companyId: number;
}
