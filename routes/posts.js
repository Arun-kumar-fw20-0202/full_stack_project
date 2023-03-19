const express = require("express");
const posts = express.Router();
posts.use(express.json());
const { PostModel } = require("../model/post.model");
require("dotenv").config();

posts.get("/", async (req, res) => {
  let query = req.query;
  let data = await PostModel.find(query);
  res.status(200).send(data);
});

// single user
posts.get("/:postId", async (req, res) => {
  let { postId } = req.params;
  let data = await PostModel.find({ _id: postId });
  res.status(200).send(data[0]);
});

// adding user
posts.post("/add", async (req, res) => {
  const payload = req.body;
  const user = new PostModel(payload);
  await user.save();
  res.status(200).send({ msg: "New user has been added" });
});

// Deleting user
posts.delete("/delete/:postId", async (req, res) => {
  const { postId } = req.params;
  try {
    await PostModel.findByIdAndDelete({ _id: postId });
    res.status(200).send({ msg: "New user has been added" });
  } catch (err) {
    res.status(400).send({ msg: err.message });
  }
});

// Updating user

posts.patch("/update/:postId", async (req, res) => {
  const { postId } = req.params;
  const payload = req.body;
  try {
    await PostModel.findByIdAndUpdate({ _id: postId }, payload);
    res.status(200).send({ msg: "The user has been updated" });
  } catch (err) {
    res.status(400).send({ msg: err.message });
  }
});

module.exports = posts;
