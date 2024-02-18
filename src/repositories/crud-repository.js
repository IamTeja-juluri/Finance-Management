const AppError = require("../utils/errors/app-error");
const { StatusCodes } = require("http-status-codes");

class CrudRepository {
  constructor(model) {
    this.model = model;
  }

  async create(data) {
    const response = await this.model.create(data);
    return response;
  }

  async deleteOne(data) {
    const response = await this.model.deleteOne(data);
    if (!response)
      throw new AppError("Not able to find resource", StatusCodes.NOT_FOUND);
    return response;
  }

  async deleteMany(data) {
    const response = await this.model.deleteMany(data);
    if (!response)
      throw new AppError("Not able to find resource", StatusCodes.NOT_FOUND);
    return response;
  }

  async get(data) {
    const response = await this.model.find(data);
    if (!response)
      throw new AppError("Not able to find resource", StatusCodes.NOT_FOUND);
    return response;
  }

  async getOne(data) {
    const response = await this.model.findOne(data);
    if (!response)
      throw new AppError("Not able to find resource", StatusCodes.NOT_FOUND);
    return response;
  }

  async getById(data) {
    const response = await this.model.findById(data);
    if (!response)
      throw new AppError("Not able to find resource", StatusCodes.NOT_FOUND);
    return response;
  }

  async updateOne(query, data) {
    const response = await this.model.findOneAndUpdate(
      query,
      { $set: data },
      { new: true }
    );
    if (!response)
      throw new AppError("Source not found or you are not the author");
    return response;
  }
}

module.exports = CrudRepository;
