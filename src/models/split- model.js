const mongoose = require("mongoose");
const splitSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    billName: {
      type: String,
      required: [true, "Please add bill name"],
    },
    amount: {
      type: Number,
      required: [true, "Please add bill amount"],
    },
    members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    image: {
      type: Object
    },
  },
  {
    timestamps: true,
  }
);
const Split = mongoose.model("Split", splitSchema);
module.exports = Split;
