const mongoose = require("mongoose");

const banner_setting_schema = new mongoose.Schema({
  banner_setting_uuid: {
    type: String,
    default: null,
  },
  banner_setting_id: {
    type: String,
    default: null,
  },
  banner_setting_name: {
    type: String,
    default: null,
  },
  banner_setting_images: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SubCategore",
    },
  ],
  banner_setting_limit: {
    type: Number,
    default: null,
  },
  banner_setting_status: {
    type: String,
    default: "Active",
  },
  is_deleted: {
    type: String,
    default: "No",
  },
  user: {
    type: Number,
    ref: "User",
  },
  creditAt: {
    type: Date,
    default: Date.now(),
  },
  is_updated: {
    type: Date,
    default: null,
  },
});

module.exports = mongoose.model("banner_setting", banner_setting_schema);
