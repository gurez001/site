const {
  createCouponMaster,
  getAllMasterCoupon,
  verifyMasterCoupon,
  singleCouponData,
  update_coupon,
} = require("../controllers/MasterCouponController");
const { authorizeRols, isAuthenticatedUser } = require("../middleware/auth");
const express = require("express");
const router = express.Router();

router
  .route("/create/master-coupon")
  .post(isAuthenticatedUser, authorizeRols("admin"), createCouponMaster);

router.route("/all-master-coupon").get(getAllMasterCoupon);
router
  .route("/all-verify-coupon")
  .post(isAuthenticatedUser, verifyMasterCoupon);

router
  .route("/single-master-coupon/:id")
  .get(isAuthenticatedUser, authorizeRols("admin"), singleCouponData);
router
  .route("/update-single-master-coupon/:id")
  .put(isAuthenticatedUser, authorizeRols("admin"), update_coupon);

//   //--------------- sub cat
//   router
//   .route("/create/sub-categore")
//   .post(isAuthenticatedUser, authorizeRols("admin"), createSubCategore);

//   router
//   .route("/update/category-status/:id")
//   .put(isAuthenticatedUser, authorizeRols("admin"), StatusCategory);

//   router
//   .route("/update/sub-category-status/:id")
//   .put(isAuthenticatedUser, authorizeRols("admin"), subStatusCategory);

//   router
//   .route("/product/all-parent-category/:id")
//   .get(isAuthenticatedUser, authorizeRols("admin"), singleParentCategory);

//   router
//   .route("/product/all-sub-category/:id")
//   .get(isAuthenticatedUser,authorizeRols("admin"),singleSubCategory)

//   router
//   .route("/update/parent-category/:id")
//   .put(isAuthenticatedUser, authorizeRols("admin"), updateParentCategore);

//   router
//   .route("/update/sub-category/:id")
//   .put(isAuthenticatedUser, authorizeRols("admin"), updateSubCategore);

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
