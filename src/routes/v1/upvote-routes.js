const express = require("express");
const { UpvoteController } = require("../../controllers");
const { AuthMiddlewares } = require("../../middlewares");
const router = express.Router();
router.use(express.json());
router.post("/", AuthMiddlewares.protect, UpvoteController.upvote);
router.get("/:modelId", AuthMiddlewares.protect, UpvoteController.getUpvotes);
router.delete("/:modelId", AuthMiddlewares.protect, UpvoteController.removeUpvote);

module.exports = router;
