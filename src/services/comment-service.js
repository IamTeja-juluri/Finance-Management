const { CommentRepository } = require("../repositories");
const { StatusCodes } = require("http-status-codes");
const AppError = require("../utils/errors/app-error");

const commentRepository = new CommentRepository();

async function addComment(data) {
  try {
    const response = await commentRepository.create(data);
    return response;
  } catch (error) {
    throw new AppError(
      "Cannot create a new post Object",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function getComments(data) {
  try {
    const response = await commentRepository.get(data);
    return response;
  } catch (error) {
    throw new AppError(
      "Cannot get comment objects",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function editComment(query, data) {
  try {
    const response = await commentRepository.updateOne(query, data);
    return response;
  } catch (error) {
    throw new AppError(
      "Cannot edit comment object",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function deleteComment(data) {
  try {
    const response = await commentRepository.deleteOne(data);
    return response;
  } catch (error) {
    throw new AppError(
      "Cannot delete post object",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

module.exports = {
  addComment,
  getComments,
  editComment,
  deleteComment,
};
