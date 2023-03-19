const mongoose = require("mongoose");

const followSchema = mongoose.Schema(
  {
    followingId: String,
    myId: String,
    date: String,
  },
  {
    versionKey: false,
  }
);

const FollowModel = mongoose.model("follower", followSchema);

module.exports = { FollowModel };
