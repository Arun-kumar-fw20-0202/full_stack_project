const mongoose = require("mongoose");

const likeSchema = mongoose.Schema(
  {
    likedUserId: String,
    postId: String,
  },
  {
    versionKey: false,
  }
);

const LikeModel = mongoose.model("like", likeSchema);

module.exports = { LikeModel };
