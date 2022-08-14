import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  ManyToOne,
  BaseEntity,
} from "typeorm";
import { Passenger } from "../../passengers/entities/passenger.entity";

@Entity({ name: "device" })
export class Device extends BaseEntity {
  constructor(device: Partial<Device>) {
    super();
    Object.assign(this, device);
  }

  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Passenger, (passenger) => passenger.devices)
  @JoinColumn()
  passenger!: Passenger;

  @Column()
  ip?: string;

  @Column()
  browser?: string;

  @Column({
    nullable: true,
  })
  referrer?: string;

  @Column({
    default: false,
  })
  is_active?: Boolean;

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
