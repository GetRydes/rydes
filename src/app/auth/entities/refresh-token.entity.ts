import { BaseEntity, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "refresh_token" })
export class RefreshToken extends BaseEntity {
  constructor(refreshToken: Partial<RefreshToken>) {
    super();
    Object.assign(this, refreshToken);
  }

  @PrimaryGeneratedColumn()
  id!: number;
}
