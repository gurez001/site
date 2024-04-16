const express = require("express");
const router = express.Router();
const {
  CreateContactDetails,
  GetContactDetails,
  SingleContactDetails,
} = require("../controllers/ContactController");
const { isAuthenticatedUser } = require("../middleware/auth");

router.route("/contact").post(CreateContactDetails);
router.route("/get-contact").get(isAuthenticatedUser, GetContactDetails);

module.exports = router;
