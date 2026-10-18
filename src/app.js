import "dotenv/config";
import express from "express";
import routes from "./routes/index.js";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import passport from "passport";
import prisma from "./lib/prisma.js";
import cors from "cors";
import fs from "node:fs";
import path from "node:path";
import errors from "./errors/index.js";

const app = express();

// === cors ===
app.use(cors());

// === Body parsing ===

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// === Authentication ===
const pathToKey = path.join(import.meta.dirname, "..", "id_rsa_pub.pem");
const PUB_KEY = fs.readFileSync(pathToKey, "utf8");

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = PUB_KEY;
opts.algorithms = ["RS256"];

passport.use(
  new JwtStrategy(opts, async function (payload, done) {
    try {
      const id = payload.sub;
      const user = await prisma.user.findFirst({ where: { id } });
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    } catch (err) {
      done(err, null);
    }
  }),
);
// === Routes ===

app.use("/api/posts", routes.posts);
app.use("/api/users", routes.users);
app.use("/api/comments", routes.comments);

// === 404 ===
app.use((req, res) => {
  throw new errors.NotFoundError("Not found");
});

// === err middleware ===
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.statusCode ? err.message : "Internal server error";
  console.log(err);
  res.status(statusCode).json({ error: err });
});

// === Init app ===

const port = process.env.PORT;
app.listen(port, (err) => {
  if (err) {
    throw err;
  }
  console.log(`App listening on port ${port}`);
});
