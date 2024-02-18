const { ReplyRepository } = require("../repositories");
const { StatusCodes } = require("http-status-codes");
const AppError = require("../utils/errors/app-error");

const replyRepository = new ReplyRepository();

async function postReply(data) {
    try {
        const response = await replyRepository.create(data);
        return response;
    } catch (error) {
        throw new AppError(
            "Cannot create a new post Object",
            StatusCodes.INTERNAL_SERVER_ERROR
        );
    }
}

async function getReplies(data) {
    try {
        const response = await replyRepository.get(data);
        return response;
    } catch (error) {
        throw new AppError(
            "Cannot get reply comment objects",
            StatusCodes.INTERNAL_SERVER_ERROR
        );
    }
}

async function editReply(query, data) {
    try {
        const response = await replyRepository.updateOne(query, data);
        return response;
    } catch (error) {
        throw new AppError(
            "Cannot edit reply comment object",
            StatusCodes.INTERNAL_SERVER_ERROR
        );
    }
}

async function deleteReply(data) {
    try {
        const response = await replyRepository.deleteOne(data);
        return response;
    } catch (error) {
        throw new AppError(
            "Cannot delete reply comment object",
            StatusCodes.INTERNAL_SERVER_ERROR
        );
    }
}

module.exports = {
    postReply,
    getReplies,
    editReply,
    deleteReply,
};
