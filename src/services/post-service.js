const { PostRepository } = require("../repositories");
const { StatusCodes } = require("http-status-codes");
const AppError = require("../utils/errors/app-error");

const postRepository = new PostRepository();

async function createPost(data) {
  try {
    const response = await postRepository.create(data);
    return response;
  } catch (error) {
    throw new AppError(
      "Cannot create a new post Object",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function getPosts() {
  try {
    const response = await postRepository.get();
    return response;
  } catch (error) {
    throw new AppError(
      "Cannot get post object",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function editPost(query, data) {
  try {
    const response = await postRepository.updateOne(query, data);
    return response;
  } catch (error) {
    throw new AppError(
      "Cannot update post object",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function deletePost(data) {
  try {
    const response = await postRepository.deleteOne(data);
    return response;
  } catch (error) {
    throw new AppError(
      "Cannot delete post object",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

module.exports = {
  createPost,
  getPosts,
  editPost,
  deletePost,
};
