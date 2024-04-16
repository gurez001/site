const express = require("express");
const { isAuthenticatedUser, authorizeRols } = require("../middleware/auth");
const {
  proccessPayment,
  paymentApiKey,
  paymentVerification,
  payentDataApi,
  payment_details_info,
} = require("../controllers/paymentControler");
const router = express.Router();

router.route("/payment/process").post(proccessPayment);
router.route("/paymentverification").post(paymentVerification);
router
  .route("/getkey")
  .get(isAuthenticatedUser, authorizeRols("admin"), paymentApiKey);
router.route("/paymentData/:paymentid").post(payentDataApi);
router
  .route("/order/payment-info/:id")
  .get(isAuthenticatedUser, payment_details_info);

module.exports = router;
