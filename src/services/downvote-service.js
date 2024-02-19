const { UpvoteRepository, DownvoteRepository } = require("../repositories");
const { StatusCodes } = require("http-status-codes");
const AppError = require("../utils/errors/app-error");

const upvoteRepository = new UpvoteRepository();
const downvoteRepository = new DownvoteRepository();

async function downvote(data) {
  try {
    const downvoteExists = await downvoteRepository.get(data);
    const upvoteExists = await upvoteRepository.get(data);
    if (downvoteExists.length > 0)
      throw new AppError(
        "You have already downvoted this post",
        StatusCodes.BAD_REQUEST
      );
    else if (upvoteExists.length > 0) await upvoteRepository.deleteOne(data);
    const response = await downvoteRepository.create(data);
    return response;
  } catch (error) {
    throw new AppError(error.explanation,
      error.statusCode
    );
  }
}

async function getDownvotes(data) {
  try {
    const response = await downvoteRepository.get(data);
    return response;
  } catch (error) {
    throw new AppError(
      "Cannot get upvotes object",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function removeDownvote(data) {
  try {
    const response = await downvoteRepository.deleteOne(data);
    return response;
  } catch (error) {
    throw new AppError(
      "Cannot get upvotes object",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

module.exports = {
  downvote,
  getDownvotes,
  removeDownvote,
};
