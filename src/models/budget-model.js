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
    },
    budgetType: {
      type: String,
      enum: ["Essential", "Close out","Party"],
      default : "Essential"
    },
    budgetPeriod: {
      type: String,
      enum: ["Weekly", "Monthly", "Yearly"],
    },
  },
  {
    timestamps: true,
  }
);

const Budget = mongoose.model("Budget", budgetSchema);
module.exports = Budget;
