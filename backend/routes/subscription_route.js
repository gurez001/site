const express = require("express");
const { isAuthenticatedUser, authorizeRols } = require("../middleware/auth");
const { email_subscription } = require("../controllers/subscription_controller");
const router = express.Router();

router.route("/email-subscription").post(email_subscription);
module.exports = router;