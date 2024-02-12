const { Bill } = require("../models");
const CrudRepository = require("./crud-repository");

class billRepository extends CrudRepository {
  constructor() {
    super(Bill);
  }
}

module.exports = billRepository;
