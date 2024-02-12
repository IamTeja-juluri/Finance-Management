const { Token } = require("../models");
const CrudRepository = require("./crud-repository");

class tokenRepository extends CrudRepository {
  constructor() {
    super(Token);
  }
}

module.exports = tokenRepository;
