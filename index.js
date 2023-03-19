const express = require("express");
const app = express();
const connection = require("./config");
const users = require("./routes/users");
const posts = require("./routes/posts");
const likes = require("./routes/likes");
const saves = require("./routes/saves");
const comments = require("./routes/comments");
const follows = require("./routes/follows");
var cors = require("cors");
app.use(cors());
require("dotenv").config();
app.use(express.json());

// users
app.use("/users", users);

// posts
app.use("/posts", posts);

// Likes
app.use("/likes", likes);

// Saves
app.use("/saved", saves);

// Comments
app.use("/comments", comments);

// Follows
app.use("/followers", follows);

// running or connecting the mongoose || MongoDB
app.listen(process.env.port, async () => {
  try {
    await connection;
    console.log("Connected to DB");
  } catch (err) {
    console.log("Something went wrong ");
    console.log(err);
  }
  console.log(`port is running on ${process.env.port}`);
});
