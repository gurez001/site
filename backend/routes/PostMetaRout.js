const express = require("express");
const router = express.Router();
const { getPostMetaSingleValue } = require("../controllers/PostMetaController");

router.route("/post-meta/single-product-value/:id").get(getPostMetaSingleValue);

module.exports = router;
