const mongoose = require("mongoose");

const saveSchema = mongoose.Schema(
  {
    savedUserId: String,
    postId: String,
  },
  {
    versionKey: false,
  }
);

const SaveModel = mongoose.model("save", saveSchema);

module.exports = { SaveModel };
