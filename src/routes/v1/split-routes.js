const express = require("express");
const { SplitController } = require("../../controllers");
const { AuthMiddlewares } = require("../../middlewares");
const { upload } = require("../../utils/common/fileUpload");
const router = express.Router();
router.use(express.json());
router.post(
  "/",
  AuthMiddlewares.protect,
  upload.single("image"),
  SplitController.createSplit
);
router.get("/", AuthMiddlewares.protect, SplitController.getSplits);
router.patch("/", AuthMiddlewares.protect, SplitController.updateSplit);
router.delete("/", SplitController.deleteSplits);
module.exports = router;
