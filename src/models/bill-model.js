const mongoose = require("mongoose");
const billSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    name: {
      type: String,
      required: [true, "Please give a meaningful bill name"],
    },
    amount: {
      type: Number,
      required: [true, "Please add amount for your bill"],
    },
    dueDate: {
      type: Date,
      required: [true, "Please add a due date for your bill"],
    },
  },
  {
    timestamps: true,
  }
);

const Bill = mongoose.model("Bill", billSchema);
module.exports = Bill;
