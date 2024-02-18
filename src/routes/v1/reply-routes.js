const express = require("express");
const { ReplyController } = require("../../controllers");
const { AuthMiddlewares } = require("../../middlewares");
const router = express.Router();
router.use(express.json());
router.post(
  "/",
  AuthMiddlewares.protect,
  ReplyController.postReply
);
router.get("/:commentId", AuthMiddlewares.protect, ReplyController.getReplies);
router.patch("/:id", AuthMiddlewares.protect, ReplyController.editReply);
router.delete("/:id", AuthMiddlewares.protect, ReplyController.deleteReply);

module.exports = router;
