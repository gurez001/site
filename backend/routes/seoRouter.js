const express = require("express");
const router = express.Router();
const { isAuthenticatedUser, authorizeRols } = require("../middleware/auth");
const { getAllSeo, create_seo } = require("../controllers/seoController");

router.route("/all-seo").get(getAllSeo);
router
  .route("/create-seo")
  .post(isAuthenticatedUser, authorizeRols("admin"), create_seo);

module.exports = router;
