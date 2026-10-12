import express from "express";
import comments from "./comments.js";
import prisma from "../lib/prisma.js";

const router = express.Router();

router.get("/", (req, res) => {
  const posts = prisma.post.findMany();
  res.json(posts);
});

router.get("/:id", (req, res) => {
  res.json({ blog: "AAAA AAAAA" });
});

router.post("/", (req, res) => {
  const blog = req.body;
  res.json(blog);
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  res.json({ deleted: id });
});

router.use("/comments", comments);

export default router;
