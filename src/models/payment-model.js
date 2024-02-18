const mongoose = require("mongoose");
const paymentSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    name: {
      type: String,
      required: [true,"Please provide a name for the payment"],
    },
    amount: {
      type: Number,
      required: [true,"Please provide an amount for the payment getting scheduled"],
    },
    date: {
      type: Date,
      required: [true,"Please provide scheduled date for the payment"],
    },
    markAsComplete: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Payment = mongoose.model("Payment", paymentSchema);
module.exports = Payment;
