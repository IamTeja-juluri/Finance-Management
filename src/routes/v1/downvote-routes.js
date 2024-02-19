const express = require("express");
const { DownvoteController } = require("../../controllers");
const { AuthMiddlewares } = require("../../middlewares");
const router = express.Router();
router.use(express.json());
router.post("/", AuthMiddlewares.protect, DownvoteController.downvote);
router.get("/:modelId", AuthMiddlewares.protect, DownvoteController.getDownvotes);
router.delete("/:modelId", AuthMiddlewares.protect, DownvoteController.removeDownvote);

module.exports = router;
