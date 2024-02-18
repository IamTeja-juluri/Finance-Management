const { Post } = require("../models");
const CrudRepository = require("./crud-repository");

class postRepository extends CrudRepository {
  constructor() {
    super(Post);
  }
  async get(data) {
    const posts = await Post.find().sort({ createdAt: -1 });
    return posts;
  }
}

module.exports = postRepository;
