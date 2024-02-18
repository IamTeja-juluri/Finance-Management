const express = require("express");
const { BudgetController } = require("../../controllers");
const { AuthMiddlewares } = require("../../middlewares");
const router = express.Router();
router.use(express.json());
router.post("/", AuthMiddlewares.protect, BudgetController.createBudget);
router.get("/", AuthMiddlewares.protect, BudgetController.getBudgets);
module.exports = router;
