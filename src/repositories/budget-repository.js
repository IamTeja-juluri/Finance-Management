const { Budget } = require("../models");
const CrudRepository = require("./crud-repository");

class budgetRepository extends CrudRepository {
  constructor() {
    super(Budget);
  }
}

module.exports = budgetRepository;
