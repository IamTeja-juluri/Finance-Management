const mongoose = require("mongoose");
const downvoteSchema = mongoose.Schema(
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

const Downvote = mongoose.model("Downvote", downvoteSchema);
module.exports = Downvote;
