const express = require("express");
const router = express.Router();
const { isAuthenticatedUser, authorizeRols } = require("../middleware/auth");
const { add_new_banner } = require("../controllers/banner_setting_controller");

router
  .route("/banner/add-new")
  .post(
    //isAuthenticatedUser, authorizeRols("admin"), 
    add_new_banner);

module.exports = router;
