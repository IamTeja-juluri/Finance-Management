const express = require("express");
const { PostController } = require("../../controllers");
const { AuthMiddlewares } = require("../../middlewares");
const { upload } = require("../../utils/common/fileUpload");
const router = express.Router();
router.use(express.json());
router.post(
  "/",
  AuthMiddlewares.protect,
  upload.single("image"),
  PostController.createPost
);
router.get("/", AuthMiddlewares.protect, PostController.getPosts);
router.patch("/:id", AuthMiddlewares.protect, PostController.editPost);
router.delete("/:id", AuthMiddlewares.protect, PostController.deletePost);

module.exports = router;
