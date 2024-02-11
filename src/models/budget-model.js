const mongoose = require("mongoose");
const budgetSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    name: {
      type: String,
      required: [true, "Please add a name to your budget"],
    },
    amount: {
      type: Number,
      required: [true, "Please add some amount to your  budget"],
    },
    expenseCategory: {
      type: String,
      enum: ["", ""],
    },
    budgetType: {
      type: String,
      enum: ["", ""],
    },
    budgetPeriod: {
      type: String,
      enum: ["weekly", "monthly", "yearly"],
    },
  },
  {
    timestamps: true,
  }
);

const Budget = mongoose.model("Budget", budgetSchema);
module.exports = Budget;
