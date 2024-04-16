const express = require("express");
const router = express.Router();
const { isAuthenticatedUser, authorizeRols } = require("../middleware/auth");
const {
  createOrder,
  getSingleOrder,
  myOrders,
  getAllOrders,
  updateOrder,
  deleteOrders,
  shipping_info,
  order_details_info,
  getAdminSingleOrder,
  get_shipping_info,
  update_shipping_info,
} = require("../controllers/orederController");

router.route("/order/new").post(isAuthenticatedUser, createOrder);
router.route("/order/:id").get(isAuthenticatedUser, getSingleOrder);
router.route("/orders/me").get(isAuthenticatedUser, myOrders);
router
  .route("/admin/orders")
  .get(isAuthenticatedUser, authorizeRols("admin"), getAllOrders);
router
  .route("/admin/order/:id")
  .put(isAuthenticatedUser, authorizeRols("admin"), updateOrder);
router
  .route("/admin/order/:id")
  .get(isAuthenticatedUser, authorizeRols("admin"), getAdminSingleOrder)
  .delete(isAuthenticatedUser, authorizeRols("admin"), deleteOrders);


  //-------------------shipping
  router
  .route("/order/shipping-info/:id")
  .get(isAuthenticatedUser,authorizeRols("admin"), shipping_info);

  router
  .route("/order/order-details-info/:id")
  .get(isAuthenticatedUser, order_details_info);


//-----------------------user



router
.route("/shipping-address-info")
.get(isAuthenticatedUser, get_shipping_info);

router
.route("/update/shipping-address-info")
.post(isAuthenticatedUser, update_shipping_info);



module.exports = router;
