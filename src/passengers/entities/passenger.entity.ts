import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  OneToMany,
} from "typeorm";
import { Address } from "./address.entity";
import { Card } from "../../cards/entities/card.entity";
import { Device } from "../../devices/entities/device.entity";

@Entity({ name: "passenger" })
export class Passenger {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  hash!: string;

  @Column({ unique: true, nullable: false })
  email!: string;

  @Column({
    nullable: false,
  })
  first_name!: string;

  @Column({ nullable: false })
  last_name!: string;

  @Column({ nullable: false })
  password!: string;

  @Column({ nullable: false })
  phone_number!: string;

  @Column({
    default: true,
  })
  is_active?: Boolean;

  @OneToMany(() => Device, (source) => source.passenger)
  @JoinColumn()
  devices?: Device[];

  @OneToMany(() => Address, (address) => address.passenger)
  @JoinColumn()
  saved_addresses?: Address[];

  @OneToMany(() => Card, (address) => address.passenger)
  @JoinColumn()
  cards?: Card[];

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
