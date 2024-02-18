const { StatusCodes } = require("http-status-codes");
const { PaymentService } = require("../services");
const { SuccessResponse, ErrorResponse } = require("../utils/common");

async function schedulePayment(req,res){
    try{
        const payment = await PaymentService.schedulePayment({...req.body, userId: req.user._id})
        SuccessResponse.data=`Payment for ${payment.name} has been scheduled`
        return res.status(StatusCodes.CREATED).json(SuccessResponse)
    }catch(error){
        ErrorResponse.error=error
        return res.status(error.statusCode).json(ErrorResponse)
    }
}

async function getScheduledPayments(req,res){
    try{
        const payments = await PaymentService.getScheduledPayments({userId: req.user._id})
        SuccessResponse.data=payments
        return res.status(StatusCodes.OK).json(SuccessResponse)
    }catch(error){
        ErrorResponse.error=error
        return res.status(error.statusCode).json(ErrorResponse)
    }
}

async function updatePaymentStatus(req,res){
    try{
        const  payment = await PaymentService.updatePaymentStatus({_id:req.params.id,userId:req.user._id},req.body)
        SuccessResponse.data = `Payment ${payment.name} has been done`
        return res.status(StatusCodes.OK).json(SuccessResponse)
    }catch(error){
        ErrorResponse.error=error
        return res.status(error.statusCode).json(ErrorResponse)
    }
}

module.exports={schedulePayment,getScheduledPayments,updatePaymentStatus}