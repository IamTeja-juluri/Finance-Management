const express = require("express");
const { CommentController } = require("../../controllers");
const { AuthMiddlewares } = require("../../middlewares");
const router = express.Router();
router.use(express.json());
router.post("/", AuthMiddlewares.protect, CommentController.addComment);
router.get("/:postId", AuthMiddlewares.protect, CommentController.getComments);
router.patch("/:id", AuthMiddlewares.protect, CommentController.editComment);
router.delete("/:id", AuthMiddlewares.protect, CommentController.deleteComment);

module.exports = router;
