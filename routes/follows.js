const express = require("express");
const follows = express.Router();
follows.use(express.json());
const { FollowModel } = require("../model/follow.model");
require("dotenv").config();

follows.get("/", async (req, res) => {
  let query = req.query;
  let data = await FollowModel.find(query);
  res.status(200).send(data);
});

// single user
follows.get("/:followId", async (req, res) => {
  let { followId } = req.params;
  let data = await FollowModel.find({ _id: followId });
  res.status(200).send(data);
});

// adding user
follows.post("/add", async (req, res) => {
  const payload = req.body;
  const user = new FollowModel(payload);
  await user.save();
  res.status(200).send(payload);
});

// Deleting user
follows.delete("/delete/:followId", async (req, res) => {
  const { followId } = req.params;
  try {
    await FollowModel.findByIdAndDelete({ _id: followId });
    res.status(200).send({ msg: "The user has been deleted" });
  } catch (err) {
    res.status(400).send({ msg: err.message });
  }
});

// Updating user

follows.patch("/update/:followId", async (req, res) => {
  const { followId } = req.params;
  const payload = req.body;
  try {
    await FollowModel.findByIdAndUpdate({ _id: followId }, payload);
    res.status(200).send({ msg: "The user has been updated" });
  } catch (err) {
    res.status(400).send({ msg: err.message });
  }
});

module.exports = follows;
