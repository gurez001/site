const express = require("express");
const {
  createBlogCategore,
  getAllBlogCategores,
  deleteBlogCategore,
  updateBlogCategore,
} = require("../controllers/blogCategoreController");
const router = express.Router();
const { isAuthenticatedUser, authorizeRols } = require("../middleware/auth");

router
  .route("/blog/create/categore")
  .post(isAuthenticatedUser, authorizeRols("admin"), createBlogCategore);

router
  .route("/blog/update/categore/:id")
  .post(isAuthenticatedUser, authorizeRols("admin"), updateBlogCategore)
  .delete(isAuthenticatedUser, authorizeRols("admin"), deleteBlogCategore);
router.route("/blog/all-categore").get(getAllBlogCategores);

module.exports = router;
