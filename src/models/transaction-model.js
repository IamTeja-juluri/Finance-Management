const mongoose = require("mongoose");
const { categories, accounts } = require("../utils/common/enums");
const transactionSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    amount: {
      type: Number,
      required: [true,'Please add transaction amount']
    },
    account: {
      type: String,
      enum: accounts,
      required : [true,'Account is required'],
    },
    category: {
      type: String,
      enum : categories,
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
