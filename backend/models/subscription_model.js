const mongoose = require("mongoose");

const subscription_schema = new mongoose.Schema({
  email: {
    type: String,
  },
  uuid: {
    type: String,
  },
  status: {
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

module.exports = mongoose.model("Subscription", subscription_schema);
