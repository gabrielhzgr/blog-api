import "dotenv/config";
import express from "express";
import routes from "./routes/index.js";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import passport from "passport";
import prisma from "./lib/prisma.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// === Authentication ===
const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = "secret";
opts.issuer = "example.com";

passport.use(
  new JwtStrategy(opts, async function (jwt_payload, done) {
    try {
      const id = jwt_payload.sub;
      const user = await prisma.user.findFirst({ where: { id } });
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    } catch (err) {
      done(err, false);
    }
  }),
);
//============

app.use("/api/posts", routes.posts);
app.use("/api/users", routes.users);
app.use("/api/comments", routes.comments);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  let message = err.statusCode ? err.message : "Internal server error";
  console.log(err);
  res.status(statusCode).json({ error: message });
});

const port = process.env.PORT;
app.listen(port, (err) => {
  if (err) {
    throw err;
  }
  console.log(`App listening on port ${port}`);
});
