import { BaseEntity } from "typeorm";

export class RefreshToken extends BaseEntity {
  constructor(refreshToken: Partial<RefreshToken>) {
    super();
    Object.assign(this, refreshToken);
  }
}
