const { StatusCodes } = require("http-status-codes");
const { BudgetService } = require("../services");
const { SuccessResponse, ErrorResponse } = require("../utils/common");
const AppError = require("../utils/errors/app-error");
const { error } = require("../utils/common/error-response");

async function createBudget(req, res) {
  try {
    const budget = await BudgetService.createBudget({
      ...req.body,
      userId: req.user._id,
    });
    SuccessResponse.data = `Budget ${budget.name} has been created`;
    return res.status(StatusCodes.CREATED).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

async function getBudgets(req, res) {
  try {
    const budgets = await BudgetService.getBudgets({userId:req.user._id})
    SuccessResponse.data = budgets;
    return res.status(StatusCodes.OK).json(SuccessResponse)
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

module.exports = {
  createBudget,
  getBudgets,
};
