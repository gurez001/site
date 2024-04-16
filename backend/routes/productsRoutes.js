const express = require("express");
const {
  getAllProducts,
  createProducts,
  updateProducts,
  deleteProduct,
  getSingleProduct,
  getAdminAllProducts,
  featureProduct,
  productStatus,
  productAttribute,
  GetAttributeData,
  singleProductAttribute,
  updateProductAttribute,
  productAttributeStatus,
  productAttributeLabel,
  getAttributeLabel,
  singleAttributeLabel,
  updateAttributeLabel,
  productAttributeLabelStatus,
  getAllLabels,
} = require("../controllers/productsController");
const router = express.Router();
const { isAuthenticatedUser, authorizeRols } = require("../middleware/auth");
const upload = require("../middleware/multer");

router.route("/products").get(getAllProducts);
router.route("/feature-product").get(featureProduct);
router
  .route("/admin/products")
  .get(isAuthenticatedUser, authorizeRols("admin"), getAdminAllProducts);
router
  .route("/product/new")
  .post(
    isAuthenticatedUser,
    authorizeRols("admin"),
    upload.array("avatar", 4),
    createProducts
  );
router
  .route("/product/:id")
  .put(
    isAuthenticatedUser,
    authorizeRols("admin"),
    upload.array("avatar", 4),
    updateProducts
  )
  .delete(isAuthenticatedUser, authorizeRols("admin"), deleteProduct);

router.route("/product/:metalink").get(getSingleProduct);
router.route("/product/status/:id").put(productStatus);

//attributr
router
  .route("/admin/products/create-attribute")
  .post(isAuthenticatedUser, authorizeRols("admin"), productAttribute);

router
  .route("/admin/products/product-attribute")
  .get(isAuthenticatedUser, authorizeRols("admin"), GetAttributeData);

router
  .route("/admin/products/single-attribute/:id")
  .get(isAuthenticatedUser, authorizeRols("admin"), singleProductAttribute);

router
  .route("/admin/products/update-attribute/:id")
  .put(isAuthenticatedUser, authorizeRols("admin"), updateProductAttribute);

router
  .route("/admin/products/status-attribute/:id")
  .put(isAuthenticatedUser, authorizeRols("admin"), productAttributeStatus);

//label
router
  .route("/admin/products/create-label/:id")
  .post(isAuthenticatedUser, authorizeRols("admin"), productAttributeLabel);

router
  .route("/admin/products/get-label/:id")
  .get(isAuthenticatedUser, authorizeRols("admin"), getAttributeLabel);

router
  .route("/admin/products/single-label/:id")
  .get(isAuthenticatedUser, authorizeRols("admin"), singleAttributeLabel);

router
  .route("/admin/products/update-label/:id")
  .put(isAuthenticatedUser, authorizeRols("admin"), updateAttributeLabel);

router
  .route("/admin/products/status-label/:id")
  .put(
    isAuthenticatedUser,
    authorizeRols("admin"),
    productAttributeLabelStatus
  );

router
  .route("/admin/products/all-att-labels")
  .get(isAuthenticatedUser, authorizeRols("admin"), getAllLabels);

module.exports = router;
