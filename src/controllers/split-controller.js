const { StatusCodes } = require("http-status-codes");
const { SplitService } = require("../services");
const { SuccessResponse, ErrorResponse } = require("../utils/common");
const AppError = require("../utils/errors/app-error");
const { error } = require("../utils/common/error-response");
const { fileSizeFormatter } = require("../utils/common/fileUpload");
const cloudinary = require("cloudinary").v2;

async function createSplit(req, res) {
  try {
    const members = req.body.members.split(",");
    req.body.members = members;
    let fileData = {};
    if (req.file) {
      let uploadedFile;
      try {
        uploadedFile = await cloudinary.uploader.upload(req.file.path, {
          folder: "FinanceManagement",
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
    const split = await SplitService.createSplit({
      ...req.body,
      userId: req.user._id,
      image: fileData
    });
    SuccessResponse.data = `Each member has to pay you ${
      split.amount / members.length
    } as per the split`;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

async function getSplits(req, res) {
  try {
    const splits = await SplitService.getSplit({ _id: req.params.id });
    const allSplits = splits.map((split) => split.billName);
    SuccessResponse.data = `Bills found are : ${allSplits.join(", ")}`;
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

async function updateSplit(req, res) {
  try {
    const updatedData = await SplitService.updateSplit(req.body, req.params.id);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

async function deleteSplits(req, res) {
  try {
    const splits = await SplitService.deleteSplits();
    const splitNames = splits.map((split) => split.billName);
    SuccessResponse.data = `Splits with billNames : ${splitNames.join(
      ", "
    )} has been deleted`;
    return res.status(error.statusCode).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

module.exports = { createSplit, getSplits, updateSplit, deleteSplits };
