const mongoose = require("mongoose");

const master_otp_schema = new mongoose.Schema({
  otp_id: {
    type: Number,
    default: null,
  },
  otp: {
    type: Number,
    default: null,
  },
  user_uuid: {
    type: String,
    default: null,
  },
  master_otp_created_date: {
    type: Date,
    default: Date.now,
  },
  master_otp_modifed_date: {
    type: Date,
    default: null,
  },
  master_otp_status: {
    type: String,
    default: "Inactive",
  },
});

module.exports = mongoose.model("Master_otp", master_otp_schema);
