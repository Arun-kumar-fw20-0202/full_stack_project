const mongoose = require("mongoose");

const commentSchema = mongoose.Schema(
  {
    postId: String,
    comment: String,
    comenteterId: String,
    deleteStatus: Boolean,
    time: String,
  },
  {
    versionKey: false,
  }
);

const CommentModel = mongoose.model("comment", commentSchema);

module.exports = { CommentModel };
