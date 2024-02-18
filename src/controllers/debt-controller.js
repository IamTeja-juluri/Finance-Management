const { StatusCodes } = require("http-status-codes");
const { DebtService } = require("../services");
const { SuccessResponse, ErrorResponse } = require("../utils/common");

async function enterDebt(req, res) {
  try {
    const debt = await DebtService.enterDebt({
      ...req.body,
      userId: req.user._id,
    });
    SuccessResponse.data = `Debt ${debt.name} has been created`;
    return res.status(StatusCodes.CREATED).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

async function getDebts(req, res) {
  try {
    const debts = await DebtService.getDebts({ userId: req.user._id });
    SuccessResponse.data = debts;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

module.exports = { enterDebt, getDebts };
