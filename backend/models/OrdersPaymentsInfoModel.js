const mongoose = require("mongoose");
const CountModel = require("./CountModel");

const orderPaymentsInfoSchema = new mongoose.Schema({
  payment_info_uuid: {
    type: String,
  },
  payment_info_amount: {
    type: Number,
    default: 0,
  },
  order_info_uuid: {
    type: String,
  },
  wallet_transaction_uuid: {
    type: String,
    default: null,
  },
  used_coupon_uuid: {
    type: String,
    default: null,
  },
  payment_info_tnx: {
    type: Number,
    default: null,
  },
  payment_type: {
    type: String,
    default: null,
  },
  paynent_response: [
    {
      type: mongoose.Schema.Types.Mixed,
    },
  ],
  transaction_id: {
    type: String,
    default: null,
  },
  payment_info_created_date: {
    type: Date,
    default: Date.now,
  },
  payment_info_modified_date: {
    type: String,
    default: null,
  },
  payment_info_status: {
    type: String,
    default: "Proccessing",
  },
  payment_info_is_deleted: {
    type: String,
    default: "No",
  },
  user: {
    type: Number,
    ref: "User",
  },
});

module.exports = mongoose.model("Order_Payment_Info", orderPaymentsInfoSchema);
