const express = require("express");
const saves = express.Router();
saves.use(express.json());
const { SaveModel } = require("../model/save.model");
require("dotenv").config();

saves.get("/", async (req, res) => {
  let query = req.query;
  let data = await SaveModel.find(query);
  res.status(200).send(data);
});

// single user
saves.get("/:saveId", async (req, res) => {
  let { saveId } = req.params;
  let data = await SaveModel.find({ _id: saveId });
  res.status(200).send(data);
});

// adding user
saves.post("/add", async (req, res) => {
  const payload = req.body;
  const user = new SaveModel(payload);
  await user.save();
  res.status(200).send(payload);
});

// Deleting user
saves.delete("/delete/:saveId", async (req, res) => {
  const { saveId } = req.params;
  try {
    await SaveModel.findByIdAndDelete({ _id: saveId });
    res.status(200).send({ msg: "New user has been added" });
  } catch (err) {
    res.status(400).send({ msg: err.message });
  }
});

// Updating user

saves.patch("/update/:saveId", async (req, res) => {
  const { saveId } = req.params;
  const payload = req.body;
  try {
    await SaveModel.findByIdAndUpdate({ _id: saveId }, payload);
    res.status(200).send({ msg: "The user has been updated" });
  } catch (err) {
    res.status(400).send({ msg: err.message });
  }
});

module.exports = saves;
