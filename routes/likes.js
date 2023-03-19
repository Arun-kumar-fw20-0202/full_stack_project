const express = require("express");
const likes = express.Router();
likes.use(express.json());
const { LikeModel } = require("../model/like.model");
require("dotenv").config();

likes.get("/", async (req, res) => {
  let query = req.query;
  let data = await LikeModel.find(query);
  res.status(200).send(data);
});

// single user
likes.get("/:likeId", async (req, res) => {
  let { likeId } = req.params;
  let data = await LikeModel.find({ _id: likeId });
  res.status(200).send(data);
});

// adding user
likes.post("/add", async (req, res) => {
  const payload = req.body;
  const user = new LikeModel(payload);
  await user.save();
  res.status(200).send(payload);
});

// Deleting user
likes.delete("/delete/:likeId", async (req, res) => {
  const { likeId } = req.params;
  try {
    await LikeModel.findByIdAndDelete({ _id: likeId });
    res.status(200).send({ msg: "New user has been Deleted" });
  } catch (err) {
    res.status(400).send({ msg: err.message });
  }
});

// Updating user

likes.patch("/update/:likeId", async (req, res) => {
  const { likeId } = req.params;
  const payload = req.body;
  try {
    await LikeModel.findByIdAndUpdate({ _id: likeId }, payload);
    res.status(200).send({ msg: "The user has been updated" });
  } catch (err) {
    res.status(400).send({ msg: err.message });
  }
});

module.exports = likes;
