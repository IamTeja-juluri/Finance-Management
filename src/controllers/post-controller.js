const { StatusCodes } = require("http-status-codes");
const { PostService } = require("../services");
const { SuccessResponse, ErrorResponse } = require("../utils/common");
const AppError = require("../utils/errors/app-error");
const { fileSizeFormatter } = require("../utils/common/fileUpload");
const cloudinary = require("cloudinary").v2;

async function createPost(req, res) {
  try {
    let fileData = {};
    if (req.file) {
      let uploadedFile;
      try {
        uploadedFile = await cloudinary.uploader.upload(req.file.path, {
          folder: "usersProfilePictures",
          resource_type: "image",
        });
      } catch (error) {
        throw new AppError(
          "Image could not be uploaded",
          StatusCodes.EXPECTATION_FAILED
        );
      }
      fileData = {
        fileName: req.file.originalname,
        filePath: uploadedFile.secure_url,
        fileType: req.file.mimetype,
        fileSize: fileSizeFormatter(req.file.size, 2),
      };
    }
    const post = await PostService.createPost({
      ...req.body,
      image: fileData,
      userId: req.user._id,
    });
    SuccessResponse.data = post;
    return res.status(StatusCodes.CREATED).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

async function getPosts(req, res) {
  try {
    const posts = await PostService.getPosts();
    SuccessResponse.data = posts;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

async function editPost(req, res) {
  try {
    const posts = await PostService.editPost(
      { _id: req.params.id, userId: req.user._id },
      { ...req.body }
    );
    SuccessResponse.data = posts;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

async function deletePost(req, res) {
  try {
    const posts = await PostService.deletePost({
      _id: req.params.id,
      userId: req.user._id,
    });
    SuccessResponse.data = posts;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

module.exports = { createPost, getPosts, editPost, deletePost };
