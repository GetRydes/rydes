import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { Passenger } from "../app/passengers/entities/passenger.entity";

const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers["authorization"];
  if (authHeader == null)
    return res
      .status(401)
      .json({ status: false, message: "No authorization header was found" });

  const token = authHeader && authHeader.split(" ")[1];
  if (token == null)
    return res.status(401).json({
      status: false,
      message: "No token provided in authorization header",
    });

  jwt.verify(token, process.env.TOKEN_SECRET_KEY as string, (err, user) => {
    if (err)
      return res
        .status(401)
        .json({ status: false, message: "Invalid authorization token" });
    req.user = user as Passenger;
    next();
  });
};

export default isAuthenticated;
