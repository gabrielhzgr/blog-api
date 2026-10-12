import express from "express";
const router = express.Router({ mergeParams: true });
import prisma from "../lib/prisma.js";

router.get("/", (req, res) => {
  const { id } = req.params;
  let comments = prisma.comment.findMany({ where: { postId: id } });
  comments.map((comment) => {
    const uri = `/comments/${comment.id}`;
    return { comment, delete: uri, update: uri };
  });
  res.json(comments);
});

router.post("/", (req, res) => {
  const comment = req.body;
  res.json(comment);
});

router.put("/:id", (req, res) => {
  const comment = req.body;
  res.json(comment);
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  res.json({ deleted: id });
});

router.get("/:id/replies", (req, res) => {
  const { id } = req.params;
  res.json({ id, replies: [] });
});

export default router;
