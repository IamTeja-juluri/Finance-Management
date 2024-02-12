const { Split } = require("../models");
const CrudRepository = require("./crud-repository");

class splitRepository extends CrudRepository {
  constructor() {
    super(Split);
  }
}

module.exports = splitRepository;
