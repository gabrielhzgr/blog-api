import passport from "passport";
import errors from "../errors/index.js";

const isAuthenticated = passport.authenticate("jwt", { session: false });

const isEditor = (req, res, next) => {
  if (req.user.role == "EDITOR") {
    next();
  } else {
    throw new errors.NotAuthorized("You are not authorized");
  }
};

export { isAuthenticated, isEditor };
