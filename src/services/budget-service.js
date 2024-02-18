const { BudgetRepository } = require("../repositories");
const { StatusCodes } = require("http-status-codes");
const AppError = require("../utils/errors/app-error");

const budgetRepository = new BudgetRepository();

async function createBudget(data) {
  try {
    console.log(data)
    const response = await budgetRepository.create(data);
    return response;
  } catch (error) {
    throw new AppError(
      "Cannot add a new budget Object",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function getBudgets(data) {
    try {
      const response = await budgetRepository.get(data);
      return response;
    } catch (error) {
      throw new AppError(
        "Cannot find budget Objects",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }

module.exports = {
    createBudget,
    getBudgets
};
