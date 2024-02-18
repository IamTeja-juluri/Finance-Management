const { StatusCodes } = require("http-status-codes");
const { TransactionService } = require("../services");
const { SuccessResponse, ErrorResponse } = require("../utils/common");
const AppError = require("../utils/errors/app-error");

async function enterTransaction(req, res) {
  try {
    const userId = req.user._id;
    if (!userId) throw new AppError("User Not found", StatusCodes.NOT_FOUND);
    const { amount, account, category, label } = req.body;
    const response = await TransactionService.enterTransaction({
      userId,
      amount,
      account,
      category,
      label,
    });
    SuccessResponse.data = response;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

async function transactionHistory(req, res) {
  try {
    const response = await TransactionService.transactionHistory(req);
    const filteredData = filterAndAddTotalByDate(response)
    SuccessResponse.data = filteredData;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

function filterAndAddTotalByDate(data){
  return data.reduce((result,item)=>{
    const date = new Date(item.createdAt).toISOString().split('T')[0];
    const existingDate = result.find(entry=>entry && entry.date === date);
    if(existingDate){
      existingDate.total +=item.amount
      existingDate.transactions.push({name:item.label,amount:item.amount})
    }else{
      result.push({date,total:item.amount,transactions:[{name:item.label,amount:item.amount}]})
    }
    return result
  },[])
}

module.exports = {
  enterTransaction,
  transactionHistory
};
