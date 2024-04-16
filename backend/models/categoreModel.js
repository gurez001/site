const mongoose = require("mongoose");

const categoreSchema = new mongoose.Schema({
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
  childs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SubCategore",
    },
  ],
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

module.exports = mongoose.model("Categore", categoreSchema);
