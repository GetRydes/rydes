import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Passenger } from "./passenger.entity";

@Entity({ name: "address" })
export class Address {
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

  @ManyToOne(() => Passenger, (passenger) => passenger.saved_addresses)
  @JoinColumn()
  passenger!: Passenger;

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
