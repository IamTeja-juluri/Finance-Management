const express = require("express");
const { PaymentController } = require("../../controllers");
const { AuthMiddlewares } = require("../../middlewares");
const router = express.Router();
router.use(express.json());
router.post("/", AuthMiddlewares.protect,PaymentController.schedulePayment);
router.get("/",AuthMiddlewares.protect,PaymentController.getScheduledPayments)
router.patch("/:id",AuthMiddlewares.protect,PaymentController.updatePaymentStatus)

module.exports = router;
