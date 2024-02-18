const { Transaction } = require("../models");
const CrudRepository = require("./crud-repository");
const mongoose = require("mongoose");

class transactionRepository extends CrudRepository {
  constructor() {
    super(Transaction);
  }
  async getLatestTransactions(data) {
    const lastTwoMonths = new Date().setMonth(new Date().getMonth() - 2);
    const transactions = await Transaction.find({ userId: data.user._id ,createdAt: {$gte : lastTwoMonths} })
      .sort({ createdAt: -1 })
    return transactions;
  }

}

module.exports = transactionRepository;
