const { Post } = require("../models");
const CrudRepository = require("./crud-repository");

class postRepository extends CrudRepository {
  constructor() {
    super(Post);
  }
}

module.exports = postRepository;
