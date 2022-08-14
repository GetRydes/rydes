import express from "express";
import { Passenger } from "../../app/passengers/entities/passenger.entity";

declare global {
  namespace Express {
    interface Request {
      user?: Record<string, any>;
    }
    interface User extends Passenger {}
  }
}
