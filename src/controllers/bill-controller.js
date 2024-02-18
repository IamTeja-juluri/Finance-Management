const { StatusCodes } = require("http-status-codes");
const { BillService } = require("../services");
const { SuccessResponse, ErrorResponse } = require("../utils/common");
const AppError = require("../utils/errors/app-error");
const { error } = require("../utils/common/error-response");


async function addBill(req,res){
    try{
        const bill = await BillService.addBill({...req.body, userId: req.user._id})
        SuccessResponse.data=`Bill ${bill.name} has been added successfully`
        return res.status(StatusCodes.CREATED).json(SuccessResponse)
    }catch(error){
        ErrorResponse.error=error
        return res.status(error.statusCode).json(ErrorResponse)
    }
}

async function getBills(req,res){
    try{
        const bills = await BillService.getBills({userId: req.user._id})
        SuccessResponse.data=bills
        return res.status(StatusCodes.CREATED).json(SuccessResponse)
    }catch(error){
        ErrorResponse.error=error
        return res.status(error.statusCode).json(ErrorResponse)
    }
}

async function updateBillStatus(req,res){
    try{
        const  updatedBill = await BillService.updateBillStatus({_id:req.params.id,userId:req.user._id},req.body)
        SuccessResponse.data = `Bill ${updatedBill.name} has been marked as paid`
        return res.status(StatusCodes.OK).json(SuccessResponse)
    }catch(error){
        ErrorResponse.error=error
        return res.status(error.statusCode).json(ErrorResponse)
    }
}

module.exports={addBill,getBills,updateBillStatus}