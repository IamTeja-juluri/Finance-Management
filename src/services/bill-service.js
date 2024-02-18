const { BillRepository } = require("../repositories");
const { StatusCodes } = require("http-status-codes");
const AppError = require("../utils/errors/app-error");

const billRepository = new BillRepository();

async function addBill(data) {
  try {
    const response = await billRepository.create(data);
    return response;
  } catch (error) {
    throw new AppError(
      "Cannot add a new bill Object",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function getBills(data) {
    try {
      const response = await billRepository.get(data);
      return response;
    } catch (error) {
      throw new AppError(
        "Cannot find bill Objects",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }
async function updateBillStatus(query,data){
    try{
        const response = await billRepository.updateOne(query,data)
        return response
    } catch (error) {
      throw new AppError(
        "Cannot update bill Object",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
}  

module.exports = {
    addBill,
    getBills,
    updateBillStatus
};
