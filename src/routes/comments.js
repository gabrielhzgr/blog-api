import express from "express";
const router = express.Router({ mergeParams: true });
import prisma from "../lib/prisma.js";
import { isAuthenticated } from "./authMiddleware.js";
import errors from "../errors/index.js";

const isOwner = async (req, res, next) => {
  try {
    const { id } = req.params;
    const comment = await prisma.comment.findFirst({ where: { id } });
    if (!comment) {
      throw new errors.NotFoundError("Comment not found");
    }
    if (comment.userId == req.user.id) {
      next();
    } else {
      throw new errors.NotAllowed("You did not post this comment");
    }
  } catch (err) {
    throw err;
  }
};

router.post("/", isAuthenticated, async (req, res) => {
  try {
    const data = req.body;
    const comment = await prisma.comment.create({ data });
    res.json({ comment });
  } catch (err) {
    throw err;
  }
});

router.put("/:id", isAuthenticated, isOwner, async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const comment = await prisma.comment.update({ where: { id }, data });
    res.json({ comment });
  } catch (err) {
    throw err;
  }
});

router.delete("/:id", isAuthenticated, isOwner, async (req, res) => {
  try {
    const { id } = req.params;
    const comment = await prisma.comment.delete({ where: { id } });
    res.json({ comment });
  } catch (err) {
    throw err;
  }
});

router.get("/:id/replies", async (req, res) => {
  try {
    const { id } = req.params;
    const comment = await prisma.comment.findFirst({
      where: { id },
      include: { replies: true },
    });
    const replies = comment.replies;
    res.json({ replies });
  } catch (err) {
    throw err;
  }
});

export default router;
