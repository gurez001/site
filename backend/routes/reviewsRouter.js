const express = require("express");

const router = express.Router();
const { isAuthenticatedUser, authorizeRols } = require("../middleware/auth");
const upload = require("../middleware/multer");
const {
  createProductReviews,
  getAllReviews,
  get_product_review,
} = require("../controllers/reviewsController");

router
  .route("/create/product-review")
  .put(isAuthenticatedUser, createProductReviews);

router.route("/review/product-review").get(getAllReviews);
router.route("/review/single/product-review").get(get_product_review);

module.exports = router;