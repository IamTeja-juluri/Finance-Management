const { StatusCodes } = require("http-status-codes");
const { DownvoteService } = require("../services");
const { SuccessResponse, ErrorResponse } = require("../utils/common");

async function downvote(req, res) {
  try {
    const vote = await DownvoteService.downvote({
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

async function getDownvotes(req, res) {
  try {
    const votes = await DownvoteService.getDownvotes({
      objectId: req.params.modelId,
    });
    SuccessResponse.data = votes;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

async function removeDownvote(req, res) {
  try {
    const votes = await DownvoteService.removeDownvote({
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

module.exports = { downvote, getDownvotes, removeDownvote };
