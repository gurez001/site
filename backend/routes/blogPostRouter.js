const express = require("express");
const {
  getAllBlogPost,
  createBlogPost,
  updateBlogPost,
  deleteBlogPost,
  singleBlogPost,
  filterblogpost,
} = require("../controllers/blogPostController");
const router = express.Router();
const { isAuthenticatedUser, authorizeRols } = require("../middleware/auth");

router.route("/blog/all-post").get(getAllBlogPost);
router
  .route("/blog/add-new-post")
  .post(isAuthenticatedUser, authorizeRols("admin"), createBlogPost);
router
  .route("/blog/update-post/:id")
  .put(isAuthenticatedUser, authorizeRols("admin"), updateBlogPost);
router
  .route("/blog/delete-post/:id")
  .delete(isAuthenticatedUser, authorizeRols("admin"), deleteBlogPost);
router.route("/blog/post/:id").get(singleBlogPost);
router.route("/filter/post").get(filterblogpost);

module.exports = router;
