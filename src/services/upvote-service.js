const { UpvoteRepository, DownvoteRepository } = require("../repositories");
const { StatusCodes } = require("http-status-codes");
const AppError = require("../utils/errors/app-error");

const upvoteRepository = new UpvoteRepository();
const downvoteRepository = new DownvoteRepository();

async function upvote(data) {
  try {
    const upvoteExists = await upvoteRepository.get(data);
    const downvoteExists = await downvoteRepository.get(data);
    if (upvoteExists.length > 0){
      throw new AppError(
        "You have already upvoted this post",
        StatusCodes.BAD_REQUEST
      );
    }
    else if (downvoteExists.length > 0) await downvoteRepository.deleteOne(data);
    const response = await upvoteRepository.create(data);
    return response
  } catch (error) {
    throw new AppError(error.explanation,
      error.statusCode
    );
  }
}

async function getUpvotes(data) {
  try {
    const response = await upvoteRepository.get(data);
    return response;
  } catch (error) {
    throw new AppError(
      "Cannot get upvotes object",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function removeUpvote(data) {
  try {
    const response = await upvoteRepository.deleteOne(data);
    return response;
  } catch (error) {
    throw new AppError(
      "Cannot get upvotes object",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

module.exports = {
  upvote,
  getUpvotes,
  removeUpvote,
};
