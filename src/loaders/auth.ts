import { Application } from "express";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import argon2 from "argon2";
import PassengerSchema from "../passengers/pasengers.data-access";

export default async (app: Application, callback?: () => void) => {
  passport.use(
    new LocalStrategy(
      {
        usernameField: "email",
      },
      function (email, password, next) {
        PassengerSchema.findOne({ email })
          .then((passenger) => {
            if (!passenger) {
              return next(null, false, {
                message: "Unknown passenger with email - " + email,
              });
            }
            if (!argon2.verify(password, passenger.password)) {
              return next(null, false, { message: "Incorrect password." });
            } else {
              return next(null, passenger.id);
            }
          })
          .catch((err) => {
            return next(err);
          });
      }
    )
  );

  passport.serializeUser(function (user, next) {
    // save user informaiton to the the session or request object,
    // the user information is gotten from the strategy info that you pass to the callback
    // information is then passed to the callback
    next(null, user);
  });

  passport.deserializeUser(function (id, next) {
    PassengerSchema.findById({ customerId: id as string })
      .then((passenger) => {
        next(null, passenger);
      })
      .catch((err) => {
        next(err);
      });
  });

  callback?.();
};
