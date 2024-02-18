const { TransactionRepository } = require("../repositories");
const { StatusCodes } = require("http-status-codes");
const AppError = require("../utils/errors/app-error");

const transactionRepository = new TransactionRepository();

async function enterTransaction(data) {
  try {
    const response = await transactionRepository.create(data);
    return response;
  } catch (error) {
    throw new AppError(
      "Cannot add a new transaction Object",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function transactionHistory(data) {
  try {
    const response = await transactionRepository.getLatestTransactions(data);
    return response;
  } catch (error) {
    throw new AppError(
      "Cannot get transaction Objects",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

module.exports = {
  enterTransaction,
  transactionHistory,
};
