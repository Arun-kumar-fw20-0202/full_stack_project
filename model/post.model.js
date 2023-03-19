const mongoose = require("mongoose");

const postSchema = mongoose.Schema(
  {
    userId: String,
    title: String,
    privatePost: Boolean,
    imageUrl: String,
  },
  {
    versionKey: false,
  }
);

const PostModel = mongoose.model("post", postSchema);

module.exports = { PostModel };
