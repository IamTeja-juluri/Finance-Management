const { Debt } = require("../models");
const CrudRepository = require("./crud-repository");

class debtRepository extends CrudRepository {
  constructor() {
    super(Debt);
  }
}

module.exports = debtRepository;
