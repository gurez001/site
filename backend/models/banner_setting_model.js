const mongoose = require("mongoose");

const banner_setting_schema = new mongoose.Schema({
  Banner_setting_id: {
    type: String,
  },
  Banner_setting_name: {
    type: String,

    unique: true,
  },
  Banner_setting_images: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SubCategore",
    },
  ],

  description: {
    type: String,
  },
  user: {
    type: Number,
    ref: "User",
  },
  creditAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Banner_setting", banner_setting_schema);
