const mongoose = require("mongoose");

const seoSchema = new mongoose.Schema({
  seo_uuid: {
    type: String,
    default: null,
  },
  seo_title: {
    type: String,
    default: null,
  },
  seo_keyword: {
    type: [String],
    default: null,
  },
  seo_description: {
    type: String,
    default: null,
  },
  seo_link: {
    type: String,
    default: null,
  },
  product_uuid: {
    type: String,
    default: null,
  },
});

module.exports = mongoose.model("SEO", seoSchema);
