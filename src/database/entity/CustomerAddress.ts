import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Customer } from "./Customer";

@Entity({ name: "customer_address" })
export class CustomerAddress {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  street!: string;

  @Column()
  city!: string;

  @Column()
  state!: string;

  @Column()
  country!: string;

  @ManyToOne(() => Customer, (customer) => customer.saved_addresses)
  @JoinColumn()
  customer!: Customer;

  @Column({
    default: false,
  })
  default?: Boolean;

  /*
    this could be an enum ("home", "work", "others")
    https://stackoverflow.com/questions/44974594/postgres-enum-in-typeorm
  */
  @Column()
  type!: string;

  @CreateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP(6)",
  })
  created_at!: Date;

  @UpdateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP(6)",
    onUpdate: "CURRENT_TIMESTAMP(6)",
  })
  updated_at!: Date;
}
