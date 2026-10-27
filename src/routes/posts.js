import express from "express";
import prisma from "../lib/prisma.js";
import { isAuthenticated, isEditor } from "./authMiddleware.js";
import errors from "../errors/index.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    let { page, limit } = req.query;
    page = Number(page);
    limit = Number(limit);
    const skip = (page - 1) * limit;
    const posts = await prisma.post.findMany({
      skip,
      take: limit,
    });
    res.json({ posts });
  } catch (err) {
    throw err;
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const post = await prisma.post.findFirst({ where: { id } });
    if (!post) {
      throw new errors.NotFoundError("Post not found");
    }
    res.json({ post });
  } catch (err) {
    throw err;
  }
});

router.post("/", isAuthenticated, isEditor, async (req, res) => {
  const data = req.body;
  const post = await prisma.post.create({ data });
  res.json({ post });
});

router.put("/:id", isAuthenticated, isEditor, async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  const post = await prisma.post.update({ where: { id }, data });
  res.json({ post });
});

router.delete("/:id", isAuthenticated, isEditor, async (req, res) => {
  try {
    const { id } = req.params;
    const post = await prisma.post.delete({ where: { id } });
    res.json({ post });
  } catch (err) {
    throw err;
  }
});

router.get("/:id/comments", (req, res) => {
  try {
    const { id } = req.params;
    let comments = prisma.comment.findMany({ where: { postId: id } });
    res.json({ comments });
  } catch (err) {
    throw err;
  }
});

export default router;
