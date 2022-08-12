import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Passenger } from "../../passengers/entities/passenger.entity";

@Entity({ name: "card" })
export class Card {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Passenger, (passenger) => passenger.cards)
  @JoinColumn()
  passenger!: Passenger;

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
