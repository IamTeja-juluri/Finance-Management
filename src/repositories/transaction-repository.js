const { Transaction } = require("../models");
const CrudRepository = require("./crud-repository");

class transactionRepository extends CrudRepository {
  constructor() {
    super(Transaction);
  }
}

module.exports = transactionRepository;
