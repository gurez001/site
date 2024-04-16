const {
  createCategore,
  getAllCategores,
  createSubCategore,
  StatusCategory,
  subStatusCategory,
  singleParentCategory,
  updateParentCategore,
  updateSubCategore,
  singleSubCategory,
  test,
  get_all_sub_categores,
} = require("../controllers/categoreController");
const { authorizeRols, isAuthenticatedUser } = require("../middleware/auth");

const express = require("express");

const router = express.Router();

router
  .route("/create/categore")
  .post(isAuthenticatedUser, authorizeRols("admin"), createCategore);

router.route("/all-categore").get(getAllCategores);

router
  .route("/all-sub-categore")
  .get(get_all_sub_categores);

//--------------- sub cat
router
  .route("/create/sub-categore")
  .post(isAuthenticatedUser, authorizeRols("admin"), createSubCategore);

router
  .route("/update/category-status/:id")
  .put(isAuthenticatedUser, authorizeRols("admin"), StatusCategory);

router
  .route("/update/sub-category-status/:id")
  .put(isAuthenticatedUser, authorizeRols("admin"), subStatusCategory);

router
  .route("/product/all-parent-category/:id")
  .get(isAuthenticatedUser, authorizeRols("admin"), singleParentCategory);

router
  .route("/product/all-sub-category/:id")
  .get(isAuthenticatedUser, authorizeRols("admin"), singleSubCategory);

router
  .route("/update/parent-category/:id")
  .put(isAuthenticatedUser, authorizeRols("admin"), updateParentCategore);

router
  .route("/update/sub-category/:id")
  .put(isAuthenticatedUser, authorizeRols("admin"), updateSubCategore);

router.route("/test").get(test);

module.exports = router;

// const {
//   createCategore,
//   getAllCategores,
//   createSubCategore,
//   StatusCategory,
//   subStatusCategory,
//   singleParentCategory,
//   updateParentCategore,
//   updateSubCategore,
// } = require("../controllers/categoreController");
// const { authorizeRols, isAuthenticatedUser } = require("../middleware/auth");

// const express = require("express");

// const router = express.Router();

// router
//   .route("/create/categore")
//   .post(isAuthenticatedUser, authorizeRols("admin"), createCategore);

// router.route("/all-categore").get(getAllCategores);

// //--------------- sub cat
// router
//   .route("/create/sub-categore")
//   .post(isAuthenticatedUser, authorizeRols("admin"), createSubCategore);

// router
//   .route("/update/category-status/:id")
//   .put(isAuthenticatedUser, authorizeRols("admin"), StatusCategory);

// router
//   .route("/update/sub-category-status/:id")
//   .put(isAuthenticatedUser, authorizeRols("admin"), subStatusCategory);

// router
//   .route("/product/all-parent-category/:id")
//   .get(isAuthenticatedUser, authorizeRols("admin"), singleParentCategory);

// router
//   .route("/update/parent-category/:id")
//   .put(isAuthenticatedUser, authorizeRols("admin"), updateParentCategore);

// router
//   .route("/update/sub-category/:id")
//   .put(isAuthenticatedUser, authorizeRols("admin"), updateSubCategore);

// module.exports = router;
