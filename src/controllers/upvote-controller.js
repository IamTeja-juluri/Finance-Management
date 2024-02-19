const { StatusCodes } = require("http-status-codes");
const { UpvoteService } = require("../services");
const { SuccessResponse, ErrorResponse } = require("../utils/common");

async function upvote(req, res) {
  try {
    const vote = await UpvoteService.upvote({
      ...req.body,
      userId: req.user._id,
    });
    SuccessResponse.data = vote;
    return res.status(StatusCodes.CREATED).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

async function getUpvotes(req, res) {
  try {
    const votes = await UpvoteService.getUpvotes({
      objectId: req.params.modelId,
    });
    SuccessResponse.data = votes;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

async function removeUpvote(req, res) {
  try {
    const votes = await UpvoteService.removeUpvote({
      userId: req.user._id,
      objectId: req.params.modelId,
    });
    SuccessResponse.data = votes;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

module.exports = { upvote, getUpvotes, removeUpvote };
