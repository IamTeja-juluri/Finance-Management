const { Downvote } = require("../models");
const CrudRepository = require("./crud-repository");

class downvoteRepository extends CrudRepository {
  constructor() {
    super(Downvote);
  }
}

module.exports = downvoteRepository;
