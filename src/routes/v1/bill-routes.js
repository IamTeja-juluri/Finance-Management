const express = require("express");
const { BillController } = require("../../controllers");
const { AuthMiddlewares } = require("../../middlewares");
const router = express.Router();
router.use(express.json());
router.post("/", AuthMiddlewares.protect, BillController.addBill);
router.get("/",AuthMiddlewares.protect,BillController.getBills)
router.patch("/:id",AuthMiddlewares.protect,BillController.updateBillStatus)
module.exports = router;
