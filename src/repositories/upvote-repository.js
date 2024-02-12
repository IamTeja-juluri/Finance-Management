const { Upvote } = require("../models");
const CrudRepository = require("./crud-repository");

class upvoteRepository extends CrudRepository {
  constructor() {
    super(Upvote);
  }
}

module.exports = upvoteRepository;
