import express from "express";
import passport from "passport";
import bcrypt from "bcryptjs";
import prisma from "../lib/prisma.js";
import issueJWT from "../lib/issueJWT.js";
import { isAuthenticated, isEditor } from "./authMiddleware.js";
import errors from "../errors/index.js";

const router = express.Router();

router.get("/", isAuthenticated, isEditor, async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (err) {
    throw err;
  }
});

router.delete("/", isAuthenticated, isEditor, async (req, res) => {
  try {
    const users = await prisma.user.deleteMany();
    res.json(users);
  } catch (err) {
    throw err;
  }
});

router.post("/login", async function (req, res) {
  try {
    console.log(req.body);

    const { username, password } = req.body;
    const user = await prisma.user.findFirst({ where: { username } });

    if (!user) {
      throw new errors.NotFoundError("User does not exist");
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (isValid) {
      const { token, expiresIn, iat } = issueJWT(user);
      return res.json({ user, token, iat, expiresIn });
    } else {
      throw new errors.NotValidInput("The password is incorrect");
    }
  } catch (err) {
    throw err;
  }
  res.send();
});

router.post("/signup", async (req, res) => {
  try {
    let { username, password } = req.body;
    password = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        username,
        password,
      },
    });
    const { token, iat, expiresIn } = issueJWT(user);
    res.json({ user, token, iat, expiresIn });
  } catch (err) {
    throw err;
  }
});

export default router;
