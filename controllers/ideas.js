const express = require("express");

const Idea = require("../models/Idea");
const Comment = require("../models/Comment");

const router = express.Router();

router.get("/", async (req, res) => {
  const ideas = await Idea.query();
  res.json(ideas);
});

router.get("/:id", async (req, res) => {
  const idea = await Idea.query()
    .findById(req.params.id)
    .eager("comments");
  res.json(idea);
});

router.post("/", async (req, res) => {
  try {
    const newIdea = req.body;

    const idea = await Idea.query()
      .allowInsert("[idea, creator]")
      .insert(newIdea);

    res.send(idea);
  } catch (e) {
    const message = e.data || "Internal server error";
    const status = e.statusCode || 500;
    res.status(status).json({
      error: message
    });
  }
});

router.post("/:id/comments", async (req, res) => {
  const idea = await Idea.query().findById(req.params.id);

  await idea
    .$relatedQuery("comments")
    .allowInsert("[comment, creator]")
    .insert(req.body);

  res.send(idea);
});

router.delete("/:id", async (req, res) => {
  await Idea.query().deleteById(req.params.id);

  res.redirect("/ideas");
});

router.delete("/:id/comments/:commentId", async (req, res) => {
  await Comment.query().deleteById(req.params.commentId);

  res.redirect(`/ideas/${req.params.id}`);
});

module.exports = router;
