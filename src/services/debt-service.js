const { DebtRepository } = require("../repositories");
const { StatusCodes } = require("http-status-codes");
const AppError = require("../utils/errors/app-error");

const debtRepository = new DebtRepository();

async function enterDebt(data) {
  try {
    const response = await debtRepository.create(data);
    return response;
  } catch (error) {
    throw new AppError(
      "Cannot add a new debt Object",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function getDebts(data) {
    try {
      const response = await debtRepository.get(data);
      return response;
    } catch (error) {
      throw new AppError(
        "Cannot fetch debt objects",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }
  

module.exports = {
    enterDebt,getDebts
};
