const { SplitRepository } = require("../repositories");
const { StatusCodes } = require("http-status-codes");
const AppError = require("../utils/errors/app-error");

const splitRepository = new SplitRepository();

async function createSplit(data) {
  try {
    const response = await splitRepository.create(data);
    return response;
  } catch (error) {
    throw new AppError(
      "Cannot add a new target Object",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

module.exports = {
    createSplit
};
