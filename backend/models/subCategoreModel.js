const mongoose = require("mongoose");

const subCategoreSchema = new mongoose.Schema({
  name: {
    type: String,
    default: null,
  },
  uuid: {
    type: String,
    default: null,
  },
  Parent_category: {
    type: String,
    default: null,
  },
  slug: {
    type: String,
    default: null,
  },
  thumbnail: {
    type: String,
    ref: "Images",
    default: null,
  },
  Parent_category: {
    type: String,
    ref: "Categore",
  },
  description: {
    type: String,
    default: null,
  },
  user: {
    type: Number,
    ref: "User",
  },
  category_status: {
    type: String,
    default: "Active",
  },
  is_deleted: {
    type: String,
    default: "No",
  },
  is_updated: {
    type: Date,
    default: null,
  },
  creditAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("SubCategore", subCategoreSchema);
