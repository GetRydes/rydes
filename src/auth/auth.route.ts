import { Router } from "express";
import passport from "passport";
import { makeCallback } from "../utils";
import { loginPassenger, registerPassenger } from "./auth.controller";

const router = Router();

router.post("/register", makeCallback(registerPassenger));

router.post(
  "/login/password",
  passport.authenticate("local", {
    successReturnToOrRedirect: "/api/v1/auth/login/password/success",
    failureRedirect: "/api/v1/auth/login/password/failed",
    failureMessage: false,
  })
);

router.get("/login/password/:status", makeCallback(loginPassenger));

router.post("/refresh", () => {
  // use this route to generate a new access token after the token has expired
});

router.post("/logout", () => {
  // this route invalidates the access and blakclists the refresh token
  // check that twitter guys write up
});

export default router;
