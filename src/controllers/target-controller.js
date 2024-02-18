const { StatusCodes } = require("http-status-codes");
const { TargetService } = require("../services");
const { SuccessResponse, ErrorResponse } = require("../utils/common");
const AppError = require("../utils/errors/app-error");
const { error } = require("../utils/common/error-response");

async function addTarget(req, res) {
  try {
    const userId = req.user._id;
    if (!userId) throw new AppError("User Not found", StatusCodes.NOT_FOUND);
    const target = await TargetService.addTarget({ ...req.body, userId });
    SuccessResponse.data = `New target ${target.aim} added successfully`;
    return res.status(StatusCodes.CREATED).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

async function getTargets(req, res) {
  try {
    const targets = await TargetService.getTargets({userId:req.user._id,status:'Pending'});
    SuccessResponse.data = targets;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

async function updateTarget(req,res){
  try{
    const updatedTarget=await TargetService.updateTarget(req.params.id,req.body)
    SuccessResponse.data = `${updatedTarget.aim} has been successfully updated`
    return res.status(StatusCodes.OK).json(SuccessResponse)
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

async function deleteTargets(req,res){
  try{
    const targets = await TargetService.deleteTargets()
    const targetAims = targets.map(target=>target.aim)
    SuccessResponse.data = `Targets with aims : ${targetAims.join(", ")} has been deleted`;
    return res.status(error.statusCode).json(SuccessResponse)
  }catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

module.exports = {
  addTarget,
  getTargets,
  updateTarget,
  deleteTargets
};
