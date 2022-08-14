import { Application } from "express";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import argon2 from "argon2";
import PassengerSchema from "../app/passengers/pasengers.data-access";

export default async (app: Application, callback?: () => void) => {
  app.use(passport.initialize());
  app.use(passport.session());

  passport.use(
    new LocalStrategy(
      {
        usernameField: "email",
      },
      function (email, password, next) {
        PassengerSchema.findOne({ email })
          .then(async (passenger) => {
            if (!passenger) {
              return next(null, false, {
                message: "Unknown passenger with email - " + email,
              });
            }
            const isCorrectPassword = await argon2.verify(
              passenger.password,
              password
            );
            if (!isCorrectPassword) {
              return next(null, false, { message: "Incorrect password." });
            }
            return next(null, passenger);
          })
          .catch((err) => {
            return next(err);
          });
      }
    )
  );

  passport.serializeUser(function (passenger, next) {
    // save user informaiton to the the session or request object,
    // the user information is gotten from the strategy info that you pass to the callback
    // information is then passed to the callback
    next(null, passenger.id);
  });

  passport.deserializeUser(function ({ id }, next) {
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
