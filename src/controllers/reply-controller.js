const { StatusCodes } = require("http-status-codes");
const { ReplyService } = require("../services");
const { SuccessResponse, ErrorResponse } = require("../utils/common");

async function postReply(req, res) {
  try {
    const reply = await ReplyService.postReply({
      ...req.body,
      userId: req.user._id,
    });
    SuccessResponse.data = reply;
    return res.status(StatusCodes.CREATED).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

async function getReplies(req, res) {
  try {
    const replies = await ReplyService.getReplies({ commentId: req.params.commentId });
    SuccessResponse.data = replies;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

async function editReply(req, res) {
  try {
    const comment = await ReplyService.editReply(
      {userId: req.user._id ,_id: req.params.id},
      { ...req.body }
    );
    SuccessResponse.data = comment;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

async function deleteReply(req, res) {
  try {
    const reply = await ReplyService.deleteReply({
      _id: req.params.id,
      userId: req.user._id,
    });
    SuccessResponse.data = reply;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

module.exports = { postReply, getReplies, editReply, deleteReply };
