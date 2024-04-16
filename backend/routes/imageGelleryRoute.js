const express = require("express");
const {
  getAllImages,
  createImageGellery,
  updateImageGellery,
  getImageFromIds,
  updateImageSeo,
} = require("../controllers/imageGelleryController");
const { isAuthenticatedUser } = require("../middleware/auth");
const upload = require("../middleware/multer");
const router = express.Router();

router.route("/admin/images").get(isAuthenticatedUser, getAllImages);
router.route("/admin/images/ids").post(isAuthenticatedUser, getImageFromIds);
router.route("/admin/images/update/:id").put(isAuthenticatedUser, updateImageSeo);
router
  .route("/admin/images/upload")
  .post(isAuthenticatedUser, upload.array("avatar"), createImageGellery);
module.exports = router;
