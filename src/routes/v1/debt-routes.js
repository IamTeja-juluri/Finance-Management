const express = require("express");
const { DebtController } = require("../../controllers");
const { AuthMiddlewares } = require("../../middlewares");
const router = express.Router();
router.use(express.json());
router.post("/", AuthMiddlewares.protect,DebtController.enterDebt);
router.get("/", AuthMiddlewares.protect,DebtController.getDebts);

module.exports = router;
