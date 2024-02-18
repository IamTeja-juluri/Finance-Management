const { PaymentRepository } = require("../repositories");
const { StatusCodes } = require("http-status-codes");
const AppError = require("../utils/errors/app-error");

const paymentRepository = new PaymentRepository();

async function schedulePayment(data) {
  try {
    const response = await paymentRepository.create(data);
    return response;
  } catch (error) {
    throw new AppError(
      "Cannot schedule a new payment Object",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function getScheduledPayments(data) {
    try {
      const response = await paymentRepository.get(data);
      return response;
    } catch (error) {
      throw new AppError(
        "Cannot find scheduled payment Objects",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }
async function updatePaymentStatus(query,data){
    try{
        const response = await paymentRepository.updateOne(query,data)
        return response
    } catch (error) {
      throw new AppError(
        "Cannot update payment object status",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
}  

module.exports = {
    schedulePayment,
    getScheduledPayments,
    updatePaymentStatus
};
