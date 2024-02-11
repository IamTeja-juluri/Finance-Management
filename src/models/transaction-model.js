const mongoose = require("mongoose");
const transactionSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    amount: {
      type: Number,
      required: true,
    },
    account: {
      type: String,
      enum: ["account1", "account2", "account3"],
      default: "account1",
    },
    category: {
      type: String,
      required: [true, "Please choose appropriate category"],
    },
    label: {
      type: String,
      required: [true, "Please give a meaningful label"],
    },
  },
  {
    timestamps: true,
  }
);

const Transaction = mongoose.model("Transaction", transactionSchema);
module.exports = Transaction;
