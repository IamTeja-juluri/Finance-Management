const mongoose = require("mongoose");
const upvoteSchema = mongoose.Schema(
  {
    onModel: {
      type: String,
      enum: ["Post", "Comment"],
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    objectId: {
      type: mongoose.Schema.Types.ObjectId,
      refPath: "onModel",
    },
  },
  {
    timestamps: true,
  }
);

const Upvote = mongoose.model("Upvote", upvoteSchema);
module.exports = Upvote;
