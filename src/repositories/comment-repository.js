const { Comment } = require("../models");
const CrudRepository = require("./crud-repository");

class commentRepository extends CrudRepository {
  constructor() {
    super(Comment);
  }
}

module.exports = commentRepository;
