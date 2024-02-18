const { StatusCodes } = require("http-status-codes");
const { CommentService } = require("../services");
const { SuccessResponse, ErrorResponse } = require("../utils/common");

async function addComment(req, res) {
  try {
    const comment = await CommentService.addComment({
      ...req.body,
      userId: req.user._id,
    });
    SuccessResponse.data = comment;
    return res.status(StatusCodes.CREATED).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

async function getComments(req, res) {
  try {
    const comments = await CommentService.getComments({ postId: req.params.postId });
    SuccessResponse.data = comments;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

async function editComment(req, res) {
  try {
    const comment = await CommentService.editComment(
      { _id: req.params.id, userId: req.user._id },
      { ...req.body }
    );
    SuccessResponse.data = comment;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

async function deleteComment(req, res) {
  try {
    const comment = await CommentService.deleteComment({
      _id: req.params.id,
      userId: req.user._id,
    });
    SuccessResponse.data = comment;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

module.exports = { addComment, getComments, editComment, deleteComment };
