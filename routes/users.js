const express = require("express");
const users = express.Router();
users.use(express.json());
const { UserModel } = require("../model/user.model");
require("dotenv").config();

users.get("/", async (req, res) => {
  let query = req.query;
  let data = await UserModel.find(query);
  res.status(200).send(data);
});

// single user
users.get("/:userId", async (req, res) => {
  let { userId } = req.params;
  let data = await UserModel.find({ _id: userId });
  res.status(200).send(data);
});

// adding user
users.post("/add", async (req, res) => {
  const payload = req.body;
  const user = new UserModel(payload);
  await user.save();
  res.status(200).send({ msg: "New user has been added" });
});

// Deleting user
users.delete("/delete/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    await UserModel.findByIdAndDelete({ _id: userId });
    res.status(200).send({ msg: "New user has been added" });
  } catch (err) {
    res.status(400).send({ msg: err.message });
  }
});

// Updating user

users.patch("/update/:userId", async (req, res) => {
  const { userId } = req.params;
  const payload = req.body;
  try {
    await UserModel.findByIdAndUpdate({ _id: userId }, payload);
    res.status(200).send({ msg: "The user has been updated" });
  } catch (err) {
    res.status(400).send({ msg: err.message });
  }
});

module.exports = users;
