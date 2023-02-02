import { Router } from "express";
import passport from "passport";
import qs from "query-string";
import { makeCallback } from "../../utils";
import {
  getPassenger,
  loginPassenger,
  registerPassenger,
  verifyToken,
} from "./auth.controller";

const router = Router();

router.get("/me", makeCallback(getPassenger));

router.post("/register/password", makeCallback(registerPassenger));

router.post(
  "/login/password",
  passport.authenticate("local", {
    failureRedirect: "/api/v1/auth/login/password/failed",
    failureMessage: false,
    session: true,
  }),
  (req, res) => {
    if (!req.user) return res.redirect("/api/v1/auth/login/password/failed");

    const { id, email } = req.user;

    return res.redirect(
      `/api/v1/auth/login/password/success?${qs.stringify(
        JSON.parse(JSON.stringify({ id, email }))
      )}`
    );
  }
);

router.get("/login/password/:status", makeCallback(loginPassenger));

router.get("/token/verify", makeCallback(verifyToken));

router.post("/token/refresh", () => {
  // use this route to generate a new access token after the token has expired
  /**
   * when the user attempts to get a new token using the refresh token
   * check if the refresh token is stored in the database and if its not, return 401
   * also check if it is blacklisted and if it is return 401
   * if it exists generate a new one , replace the old one with the new one in the refresh token db
   * and then blacklist the old refresh token
   */
});

router.post("/logout", () => {
  // this route invalidates the access and blakclists the refresh token
  // check that twitter guys write up
});

export default router;
