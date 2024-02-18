const express = require("express");
const { UpvoteController } = require("../../controllers");
const { AuthMiddlewares } = require("../../middlewares");
const router = express.Router();
router.use(express.json());
router.post(
  "/",
  AuthMiddlewares.protect,
  UpvoteController.upvote
);
router.get("/:modelId", AuthMiddlewares.protect, UpvoteController.getUpvotes);

module.exports = router;
