const { TargetRepository } = require("../repositories");
const { StatusCodes } = require("http-status-codes");
const AppError = require("../utils/errors/app-error");

const targetRepository = new TargetRepository();

async function addTarget(data) {
  try {
    const response = await targetRepository.create(data);
    return response;
  } catch (error) {
    throw new AppError(
      "Cannot add a new target Object",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function getTargets(data) {
  try {
    const response = await targetRepository.get(data);
    return response;
  } catch (error) {
    throw new AppError(
      "Cannot find target objects",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function updateTarget(id,data){
    try{
        const response = await targetRepository.updateOne(id,data);
        return response;
    }catch (error) {
        throw new AppError(
          "Cannot update target objects",
          StatusCodes.INTERNAL_SERVER_ERROR
        );
    }
}

async function deleteTargets(data) {
  try {
    const response = await targetRepository.deleteMany({ status: "Fulfilled" });
    return response;
  } catch (error) {
    throw new AppError(
      "Cannot delete target objects",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

module.exports = {
  addTarget,
  getTargets,
  updateTarget,
  deleteTargets,
};
