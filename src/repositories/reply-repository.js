const { Reply } = require("../models");
const CrudRepository = require("./crud-repository");

class replyRepository extends CrudRepository {
  constructor() {
    super(Reply);
  }
}

module.exports = replyRepository;
