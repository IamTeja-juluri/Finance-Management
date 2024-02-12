const { Target } = require("../models");
const CrudRepository = require("./crud-repository");

class targetRepository extends CrudRepository {
  constructor() {
    super(Target);
  }
}

module.exports = targetRepository;
