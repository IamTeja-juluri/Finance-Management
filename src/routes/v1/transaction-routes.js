const express =  require("express")
const { TransactionController } = require("../../controllers")
const { AuthMiddlewares } = require("../../middlewares")
const router = express.Router()
router.use(express.json())
router.post('/',AuthMiddlewares.protect,TransactionController.enterTransaction)
router.get('/',AuthMiddlewares.protect,TransactionController.transactionHistory)
module.exports=router;