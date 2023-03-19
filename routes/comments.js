const express = require("express");
const comments = express.Router();
comments.use(express.json());
const { CommentModel } = require("../model/comment.model");
require("dotenv").config();

comments.get("/", async (req, res) => {
  let query = req.query;
  let data = await CommentModel.find(query);
  res.status(200).send(data);
});

// single comment
comments.get("/:commentId", async (req, res) => {
  let { commentId } = req.params;
  let data = await CommentModel.find({ _id: commentId });
  res.status(200).send(data);
});

// adding Comment
comments.post("/add", async (req, res) => {
  const payload = req.body;
  const comment = new CommentModel(payload);
  await comment.save();
  res.status(200).send({ payload });
});

// Deleting comment
comments.delete("/delete/:commentId", async (req, res) => {
  const { commentId } = req.params;
  try {
    await CommentModel.findByIdAndDelete({ _id: commentId });
    res.status(200).send({ msg: "New comment has been added" });
  } catch (err) {
    res.status(400).send({ msg: err.message });
  }
});

// Updating comment

comments.patch("/update/:commentId", async (req, res) => {
  const { commentId } = req.params;
  const payload = req.body;
  try {
    await CommentModel.findByIdAndUpdate({ _id: commentId }, payload);
    res.status(200).send({ msg: "The comment has been updated" });
  } catch (err) {
    res.status(400).send({ msg: err.message });
  }
});

module.exports = comments;
