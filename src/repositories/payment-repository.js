const { Payment } = require("../models");
const CrudRepository = require("./crud-repository");

class paymentRepository extends CrudRepository {
  constructor() {
    super(Payment);
  }
}

module.exports = paymentRepository;
